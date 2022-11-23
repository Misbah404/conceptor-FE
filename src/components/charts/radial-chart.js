import React, { useRef, useEffect, useCallback } from 'react'
import * as d3 from "d3"

const RadialChart = (props) => {

    const { data, meta } = props

    const chartRef = useRef(null)

    const drawChart = useCallback(() => {
        if (chartRef.current) {
            const { width, height } = chartRef.current.getBoundingClientRect()

            const { colors, keys } = meta

            const radius = (Math.min(height, width) / 2) * 0.8;

            const barWidth = radius / 8,
                labelWidth = radius / 3,
                labelHeight = radius / 4;

            const svg = d3.select(chartRef.current)
                .append("svg")
                .attr("height", height)
                .attr("width", width)
            const svgG = svg
                .append("g")
                .attr("transform", `translate(${width / 2}, ${height / 2})`)
                .selectAll("slices")
                .data(data);

            svgG
                .join("path")
                .attr("d", (d, i) => {
                    const arc = d3.arc()
                        .outerRadius(radius - 2 * i * barWidth)
                        .innerRadius(radius - 2 * i * barWidth - barWidth);
                    return arc({ startAngle: 0, endAngle: d.percent * 2 * Math.PI });
                })
                .attr("fill", (_, i) => colors[i]);

            svgG
                .join("path")
                .attr("d", (d, i) => {
                    const arc = d3.arc()
                        .innerRadius(radius - 2 * i * barWidth - barWidth / 2)
                        .outerRadius(radius - 2 * i * barWidth - barWidth / 2);
                    return arc({
                        startAngle: d.percent * 2 * Math.PI,
                        endAngle: 2 * Math.PI,
                    });
                })
                .attr("stroke", "#162630")
                .attr("stroke-opacity", 0.4);

            d3.select(chartRef.current)
                .append("div")
                .attr("id", "labels-container")
                .selectAll(".label")
                .data(data)
                .join("span")
                .attr("class", "label")
                .each((d, i) => {
                    d.angle =
                        d.percent < 0.33
                            ? -Math.PI / 2
                            : d.percent * 2 * Math.PI - Math.PI / 2;
                    d.radius = radius - 2 * i * barWidth;
                    if (d.percent < 0.5) {
                        d.radius -= barWidth;
                    }
                })
                .style(
                    "top",
                    (d) => `${d.radius * Math.sin(d.angle) - 4 - labelHeight}px`
                )
                .style(
                    "left",
                    (d) => `${d.radius * Math.cos(d.angle) - 4 - labelWidth}px`
                )
                .style("width", `${labelWidth}px`)
                .style("height", `${labelHeight}px`)
                .style("background", (_, i) => colors[i])
                .style("font-size", `${radius * 0.1}px`)
            // .append("text")
            // .text((d) => `${d.value * 100}%`);
        }
    }, [data, meta])

    const destroyChart = useCallback(() => {
        if (chartRef.current) {
            d3.select(chartRef.current).select("svg").remove();
        }
    }, []);

    const rebuildChart = useCallback(() => {
        destroyChart();
        drawChart();
    }, [destroyChart, drawChart]);

    useEffect(() => {
        drawChart();
        window.addEventListener("resize", rebuildChart);
        return () => {
            destroyChart();
            window.removeEventListener("resize", rebuildChart);
        };
    }, [drawChart, destroyChart, rebuildChart]);

    return (
        <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
    )
}

export default RadialChart