import { useEffect, useRef } from "react";
import * as d3 from "d3";

const finiteExtent = (data, accessor, fallback) => {
    const extent = d3.extent(data, accessor);
    if (!extent.every(Number.isFinite) || extent[0] === extent[1]) {
        return fallback;
    }
    return extent;
};

export default function ScatterPlot({
    data,
    xField,
    yField,
    colorField,
    labelField,
    xLabel = xField,
    yLabel = yField,
    xDomain,
    yDomain,
    brush = false,
    onBrushChange,
    onBrushSelection,
    pointStyle = "filled",
    pointRadius,
    emptyMessage = "No records match the current filters.",
}) {
    const svgRef = useRef(null);
    const containerRef = useRef(null);
    const tooltipRef = useRef(null);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const tooltip = d3.select(tooltipRef.current);
        svg.selectAll("*").remove();
        tooltip.classed("is-visible", false).selectAll("*").remove();

        const width = 900;
        const height = 570;
        const margin = {
            top: colorField ? 72 : 34,
            right: 46,
            bottom: 72,
            left: 92,
        };
        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;
        const cleanData = (data ?? []).filter(datum =>
            Number.isFinite(Number(datum[xField])) &&
            Number.isFinite(Number(datum[yField]))
        );

        svg
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("role", "img")
            .attr(
                "aria-label",
                `${yLabel} by ${xLabel} scatter plot with ${cleanData.length} points`,
            );

        if (cleanData.length === 0) {
            svg
                .append("text")
                .attr("x", width / 2)
                .attr("y", height / 2)
                .attr("text-anchor", "middle")
                .attr("fill", "#69747b")
                .attr("font-size", 18)
                .text(emptyMessage);
            return undefined;
        }

        const xExtent = xDomain ??
            finiteExtent(cleanData, d => Number(d[xField]), [0, 1]);
        const yExtent = yDomain ??
            finiteExtent(cleanData, d => Number(d[yField]), [0, 1]);
        const x = d3
            .scaleLinear()
            .domain(xExtent)
            .nice()
            .range([0, plotWidth]);
        const y = d3
            .scaleLinear()
            .domain(yExtent)
            .nice()
            .range([plotHeight, 0]);
        const root = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        root
            .append("g")
            .attr("class", "chart-grid")
            .call(
                d3
                    .axisLeft(y)
                    .ticks(8)
                    .tickSize(-plotWidth)
                    .tickFormat(""),
            );
        root
            .append("g")
            .attr("class", "chart-grid")
            .attr("transform", `translate(0,${plotHeight})`)
            .call(
                d3
                    .axisBottom(x)
                    .ticks(9)
                    .tickSize(-plotHeight)
                    .tickFormat(""),
            );

        root
            .append("g")
            .attr("class", "chart-axis")
            .attr("transform", `translate(0,${plotHeight})`)
            .call(d3.axisBottom(x).ticks(9));
        root
            .append("g")
            .attr("class", "chart-axis")
            .call(d3.axisLeft(y).ticks(8));

        root
            .append("text")
            .attr("class", "chart-axis-label")
            .attr("x", plotWidth / 2)
            .attr("y", plotHeight + 57)
            .attr("text-anchor", "middle")
            .text(xLabel);
        root
            .append("text")
            .attr("class", "chart-axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -plotHeight / 2)
            .attr("y", -66)
            .attr("text-anchor", "middle")
            .text(yLabel);

        const colorValues = colorField
            ? Array.from(new Set(cleanData.map(d => d[colorField])))
            : [];
        const color = d3
            .scaleOrdinal()
            .domain(colorValues)
            .range(["#e76f51", "#2a9d8f", "#4c78a8", "#f2c14e"]);

        const getBrushRanges = selection => {
            const [[x0, y0], [x1, y1]] = selection;
            return [
                [x.invert(x0), x.invert(x1)],
                [y.invert(y1), y.invert(y0)],
            ];
        };

        if (brush) {
            const brushBehavior = d3
                .brush()
                .extent([[0, 0], [plotWidth, plotHeight]])
                .on("end", event => {
                    if (!event.selection) return;
                    const ranges = getBrushRanges(event.selection);
                    onBrushChange?.(ranges[0], ranges[1]);
                    onBrushSelection?.(
                        ranges[0],
                        ranges[1],
                    );
                });
            root
                .append("g")
                .attr("class", "chart-brush")
                .call(brushBehavior);
        }

        const outlinedPoints = pointStyle === "outline";
        const pointStroke = outlinedPoints ? "#4c78a8" : "#fff";
        const pointStrokeWidth = outlinedPoints ? 1.8 : 0.8;
        const points = root
            .append("g")
            .attr("class", "chart-points")
            .selectAll("circle")
            .data(cleanData)
            .join("circle")
            .attr("cx", d => x(Number(d[xField])))
            .attr("cy", d => y(Number(d[yField])))
            .attr(
                "r",
                pointRadius ?? (labelField ? 4.2 : 5.2),
            )
            .attr("fill", d =>
                outlinedPoints
                    ? "none"
                    : (colorField ? color(d[colorField]) : "#4c78a8"),
            )
            .attr("fill-opacity", outlinedPoints ? 1 : 0.72)
            .attr("stroke", pointStroke)
            .attr("stroke-width", pointStrokeWidth)
            .attr("pointer-events", brush ? "none" : "auto");

        const tooltipFields = [xField, yField, colorField].filter(Boolean);
        const renderTooltip = datum => {
            tooltip.selectAll("*").remove();
            tooltipFields.forEach(field => {
                const row = tooltip
                    .append("div")
                    .attr("class", "showcase-chart-tooltip__row");
                row
                    .append("span")
                    .attr("class", "showcase-chart-tooltip__label")
                    .text(field);
                row
                    .append("span")
                    .attr("class", "showcase-chart-tooltip__value")
                    .text(datum[field]);
            });
        };
        const moveTooltip = event => {
            const container = containerRef.current;
            const tooltipElement = tooltipRef.current;
            if (!container || !tooltipElement) return;

            const bounds = container.getBoundingClientRect();
            const offset = 14;
            const edgePadding = 8;
            let left = event.clientX - bounds.left + offset;
            let top = event.clientY - bounds.top + offset;
            const tooltipWidth = tooltipElement.offsetWidth;
            const tooltipHeight = tooltipElement.offsetHeight;

            if (left + tooltipWidth > bounds.width - edgePadding) {
                left = event.clientX - bounds.left - tooltipWidth - offset;
            }
            if (top + tooltipHeight > bounds.height - edgePadding) {
                top = event.clientY - bounds.top - tooltipHeight - offset;
            }
            tooltip
                .style("left", `${Math.max(edgePadding, left)}px`)
                .style("top", `${Math.max(edgePadding, top)}px`);
        };

        if (!brush) {
            points
                .on("pointerenter", function (event, datum) {
                    renderTooltip(datum);
                    tooltip.classed("is-visible", true);
                    moveTooltip(event);
                    d3.select(this)
                        .attr("stroke", "#4c78a8")
                        .attr("stroke-width", 1.8);
                })
                .on("pointermove", moveTooltip)
                .on("pointerleave", function () {
                    tooltip.classed("is-visible", false);
                    d3.select(this)
                        .attr("stroke", pointStroke)
                        .attr("stroke-width", pointStrokeWidth);
                });
        }

        if (labelField) {
            root
                .append("g")
                .attr("class", "chart-labels")
                .selectAll("text")
                .data(cleanData)
                .join("text")
                .attr("x", d => x(Number(d[xField])) + 6)
                .attr("y", d => y(Number(d[yField])) + 3)
                .attr("font-size", 9)
                .attr("fill", "#252b2f")
                .attr("pointer-events", "none")
                .text(d => d[labelField]);
        }

        if (colorField) {
            const legend = svg
                .append("g")
                .attr("class", "chart-legend")
                .attr("transform", `translate(${margin.left},24)`);
            legend
                .append("text")
                .attr("x", 0)
                .attr("y", 10)
                .attr("font-weight", 600)
                .text(colorField);
            const item = legend
                .selectAll("g")
                .data(colorValues)
                .join("g")
                .attr(
                    "transform",
                    (_d, index) => `translate(${105 + index * 145},0)`,
                );
            item
                .append("circle")
                .attr("cx", 0)
                .attr("cy", 6)
                .attr("r", 5)
                .attr("fill", d => color(d));
            item
                .append("text")
                .attr("x", 10)
                .attr("y", 10)
                .attr("font-size", 13)
                .text(d => d);
        }

        return undefined;
    }, [
        data,
        xField,
        yField,
        colorField,
        labelField,
        xLabel,
        yLabel,
        xDomain,
        yDomain,
        brush,
        onBrushChange,
        onBrushSelection,
        pointStyle,
        pointRadius,
        emptyMessage,
    ]);

    return (
        <div ref={containerRef} className="showcase-chart-container">
            <svg ref={svgRef} className="showcase-chart" />
            <div
                ref={tooltipRef}
                className="showcase-chart-tooltip"
                role="tooltip"
            />
        </div>
    );
}
