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
        'stroke: "#495057",\n                        strokeWidth: "2"',
        2,
        "PW1 temporal connection lines",
    );
    patched = replaceWhenPresent(
        patched,
        /stroke: "#495057",\s*strokeWidth: "1"/g,
        'stroke: "#495057",\n                        strokeWidth: "2"',
        2,
        "PW1 temporal connection thickness",
    );
    patched = replaceWhenPresent(
        patched,
        /stroke: TEMPORAL_SLIDER_LINE_COLOR,\s*strokeWidth: "1"/g,
        'stroke: TEMPORAL_SLIDER_LINE_COLOR,\n                        strokeWidth: "2"',
        2,
        "PW1 named temporal connection thickness",
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
