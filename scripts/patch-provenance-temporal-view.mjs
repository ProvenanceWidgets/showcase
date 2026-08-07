import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const bundlePaths = [
    new URL("../node_modules/provenance-widgets/dist/index.js", import.meta.url),
    new URL("../node_modules/provenance-widgets/dist/index.cjs", import.meta.url),
];

const replaceExpected = (source, pattern, replacement, expected, label) => {
    const matches = source.match(pattern) ?? [];
    if (matches.length !== expected) {
        throw new Error(
            `Unable to patch ${label}: expected ${expected} match(es), ` +
            `found ${matches.length}.`,
        );
    }
    return source.replace(pattern, replacement);
};

const replaceWhenPresent = (
    source,
    pattern,
    replacement,
    expected,
    label,
) => {
    const matches = source.match(pattern) ?? [];
    if (matches.length === 0) return source;
    return replaceExpected(source, pattern, replacement, expected, label);
};

const patchBundle = source => {
    let patched = source;
    patched = replaceWhenPresent(
        patched,
        /const temporalPlotHeight = Math\.max\(\s*32,\s*brushEnabled \? TEMPORAL_BRUSH_HEIGHT : sortedEntries\.length \* 32\s*\);/g,
        "const temporalPlotHeight = brushEnabled ? " +
            "TEMPORAL_BRUSH_HEIGHT : 250;",
        1,
        "fixed PW1 temporal height",
    );
    patched = replaceWhenPresent(
        patched,
        /style: \{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "300px", overflowY: "auto", flexGrow: 1, position: "relative" \}, children: chartData\.isRangeSlider \|\| chartData\.isSingleSlider \?/g,
        "style: { display: \"flex\", flexDirection: \"column\", " +
            "gap: \"8px\", maxHeight: chartData.isRangeSlider || " +
            "chartData.isSingleSlider ? \"none\" : \"300px\", " +
            "overflowY: chartData.isRangeSlider || " +
            "chartData.isSingleSlider ? \"visible\" : \"auto\", " +
            "flexGrow: 1, position: \"relative\" }, children: " +
            "chartData.isRangeSlider || chartData.isSingleSlider ?",
        1,
        "non-scrolling slider temporal plot",
    );
    patched = replaceWhenPresent(
        patched,
        /stroke: color2,\s*strokeWidth: "2"/g,
        'stroke: "#495057",\n                        strokeWidth: "1"',
        2,
        "PW1 temporal connection lines",
    );
    patched = replaceWhenPresent(
        patched,
        /stroke: (PW1_TEMPORAL_LINE_COLOR|TEMPORAL_SLIDER_LINE_COLOR),\s*strokeWidth: "2"/g,
        'stroke: $1,\n                    strokeWidth: "1"',
        1,
        "PW1 one-pixel temporal connections",
    );
    patched = replaceWhenPresent(
        patched,
        /top: "-4px"/g,
        "top: 0",
        2,
        "circle-center line alignment",
    );
    patched = replaceWhenPresent(
        patched,
        /(alignItems: "center",\s*)height: "24px",(\s*position: "absolute",\s*top: `\$\{temporalYPositions\[index\] - 8\}px`)/g,
        '$1height: "16px",$2',
        1,
        "fixed temporal point row",
    );
    patched = replaceWhenPresent(
        patched,
        /style: \{ position: "absolute", top: 0, left: "6px", width: "calc\(100% - 12px\)", height: `\$\{temporalPlotHeight\}px`, pointerEvents: "none", zIndex: 1 \}/g,
        'style: { position: "absolute", top: 0, left: "6px", ' +
            'width: "calc(100% - 12px)", ' +
            'height: `${temporalPlotHeight}px`, overflow: "visible", ' +
            'pointerEvents: "none", zIndex: 0 }',
        1,
        "unclipped temporal endpoint line",
    );
    patched = replaceWhenPresent(
        patched,
        /(top: `\$\{temporalYPositions\[index\] - 8\}px`,\s*left: 0,\s*right: 0)(\s*\}, children:)/g,
        "$1,\n                zIndex: 1$2",
        1,
        "temporal points above connection lines",
    );
    patched = replaceWhenPresent(
        patched,
        /(backgroundColor: color2,\s*)border: `1px solid \$\{color\(color2\)\.darker\(\)\}`,(\s*pointerEvents: "none")/g,
        '$1border: "1px solid #495057",$2',
        2,
        "PW1 temporal point outlines",
    );
    patched = replaceWhenPresent(
        patched,
        /getScentColor\(\s*value,\s*strategy,\s*(Oranges_default|interpolateOranges),\s*provenanceMode === "time" \? "time" : "index"\s*\)/g,
        "getScentColor(value, strategy, $1)",
        1,
        "PW1 Input Text orange scent colors",
    );

    if (
        !patched.includes(
            "${safePanelClass} .p-multiselect-item.p-highlight",
        )
    ) {
        patched = replaceExpected(
            patched,
            /(\.\$\{safePanelClass\} \.p-multiselect-item > span \{\s*flex-grow: 1;\s*min-width: 0;\s*\})/g,
            "$1\n" +
                "                .${safePanelClass} " +
                ".p-multiselect-item.p-highlight,\n" +
                "                .${safePanelClass} " +
                ".p-multiselect-item.p-focus {\n" +
                "                    background: transparent !important;\n" +
                "                }",
            1,
            "Multi Select option selection background",
        );
    }
    if (
        !patched.includes(
            "${safePanelClass} .p-dropdown-item.p-highlight",
        )
    ) {
        patched = replaceExpected(
            patched,
            /(\.\$\{safePanelClass\} \.p-dropdown-item > span \{\s*flex-grow: 1;\s*min-width: 0;\s*\})/g,
            "$1\n" +
                "                .${safePanelClass} " +
                ".p-dropdown-item.p-highlight,\n" +
                "                .${safePanelClass} " +
                ".p-dropdown-item.p-focus {\n" +
                "                    background: transparent !important;\n" +
                "                }",
            1,
            "Single Select option selection background",
        );
    }

    if (
        !patched.includes(
            ".provenance-multiselect-panel-${safeTarget}",
        )
    ) {
        patched = replaceExpected(
            patched,
            /const chart = eventTarget\?\.closest\?\.\(\s*"\[data-provenance-chart-target\]"\s*\);\s*return chart\?\.getAttribute\?\.\("data-provenance-chart-target"\) === target;/g,
            "const interaction = eventTarget?.closest?.(\n" +
                '    "[data-provenance-chart-target], " +\n' +
                '    "[data-widget-id], [data-provenance-widget]"\n' +
                ");\n" +
                "  if (\n" +
                "    interaction?.getAttribute?.(\n" +
                '      "data-provenance-chart-target"\n' +
                "    ) === target ||\n" +
                "    interaction?.getAttribute?.(" +
                '"data-widget-id") === target ||\n' +
                "    interaction?.getAttribute?.(" +
                '"id") === target\n' +
                "  ) {\n" +
                "    return true;\n" +
                "  }\n" +
                "  const safeTarget = String(target ?? \"\").replace(" +
                "/[^a-zA-Z0-9_-]/g, \"-\");\n" +
                "  const dropdownPanel = eventTarget?.closest?.(\n" +
                "    `.provenance-dropdown-panel-${safeTarget}, ` +\n" +
                "    `.provenance-multiselect-panel-${safeTarget}`\n" +
                "  );\n" +
                "  return Boolean(dropdownPanel);",
            1,
            "open footprint interaction boundary",
        );
        patched = replaceExpected(
            patched,
            /("aria-label": groupProps\["aria-label"\] \?\? tooltipLabel,\s*)("data-provenance-widget": "checkbox-group")/g,
            '$1"data-widget-id": id2,\n      $2',
            1,
            "Checkbox Group interaction target",
        );
        patched = replaceExpected(
            patched,
            /("aria-label": groupProps\["aria-label"\] \?\? tooltipLabel,\s*)("data-provenance-widget": "radio-group")/g,
            '$1"data-widget-id": id2,\n      $2',
            1,
            "Radio Group interaction target",
        );
        patched = replaceExpected(
            patched,
            /(ref: setContainerRef,\s*"data-label": tooltipLabel,)(\s*style:)/g,
            '$1\n      "data-widget-id": props.id,$2',
            2,
            "slider interaction targets",
        );
        patched = replaceExpected(
            patched,
            /const dropdownRef = ((?:useRef\d*|\(0, import_react\d+\.useRef\)))\(null\);\s*(const propsRef = \1\(props\);)/g,
            "const dropdownRef = $1(null);\n" +
                "  const reopenAfterSelectionRef = $1(false);\n" +
                "  $2",
            2,
            "dropdown selection reopen refs",
        );
        patched = replaceExpected(
            patched,
            /(if \(open\) \{\s*dropdownRef\.current\?\.show\?\.\(\);\s*\} else \{\s*)(dropdownRef\.current\?\.hide\?\.\(\);)/g,
            "$1reopenAfterSelectionRef.current = false;\n        $2",
            2,
            "dropdown close reset",
        );
        patched = replaceExpected(
            patched,
            /(const handleChange = \(event\) => \{\s*)(const nextSelection = resolveSingleSelectOption\()/g,
            "$1if (showTimeline) {\n" +
                "      reopenAfterSelectionRef.current = true;\n" +
                "    }\n" +
                "    $2",
            1,
            "Single Select keep-open selection",
        );
        patched = replaceExpected(
            patched,
            /(dropdownProps\.onHide\?\.\(event\);\s*)(if \(showTimeline\) \{)/g,
            "$1if (showTimeline && " +
                "reopenAfterSelectionRef.current) {\n" +
                "                reopenAfterSelectionRef.current = false;\n" +
                "                setTimeout(() => " +
                "dropdownRef.current?.show?.(), 0);\n" +
                "                return;\n" +
                "              }\n" +
                "              reopenAfterSelectionRef.current = false;\n" +
                "              $2",
            1,
            "Single Select panel persistence",
        );
    }

    const liveSingleSliderCallback =
        /emittedValueRef\.current = nextValue;\s*setDisplayValue\(nextValue\);\s*callValueCallbacks\(propsRef\.current, nextValue, event\);(\s*\};\s*const handleSlideEnd)/g;
    if (liveSingleSliderCallback.test(patched)) {
        liveSingleSliderCallback.lastIndex = 0;
        patched = replaceExpected(
            patched,
            liveSingleSliderCallback,
            "setDisplayValue(nextValue);\n" +
                '    if (event.originalEvent?.type === "keydown") {\n' +
                "      emittedValueRef.current = nextValue;\n" +
                "      recordInteraction(nextValue);\n" +
                "      callValueCallbacks(propsRef.current, nextValue, event);\n" +
                "    }$1",
            1,
            "single-slider release-only commit",
        );
    }
    return patched;
};

for (const bundleUrl of bundlePaths) {
    const source = await readFile(bundleUrl, "utf8");
    const patched = patchBundle(source);
    if (patched !== source) {
        await writeFile(bundleUrl, patched, "utf8");
        console.log(
            `Patched ${fileURLToPath(bundleUrl)} with showcase compatibility fixes.`,
        );
    }
}
