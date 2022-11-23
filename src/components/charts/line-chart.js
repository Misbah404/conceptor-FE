import React, { useRef, useEffect, useCallback } from 'react'
import * as d3 from "d3"

const RadialChart = (props) => {

    const { ebitda, expense } = props

    const chartRef = useRef(null)

    const drawChart = useCallback(() => {
        if (chartRef.current) {
            const { width, height } = chartRef.current.getBoundingClientRect()

            let values = []
            expense.map(d => {
                values.push(d.value)
            })
            ebitda.map(d => {
                values.push(d.value)
            })

            const svg = d3.select(chartRef.current)
                .append("svg")
                .attr("height", height)
                .attr("width", width)

            const x = d3.scaleBand()
                .domain([1, 2, 3, 4, 5])
                .range([1, width])
            svg.append("g")
                .attr("transform", `translate(0, ${height - 10})`)
                .call(d3.axisBottom(x)
                    .tickSize(0)
                    .tickFormat(function (d) {
                        return `Year ${d3.format('.0f')(d)}`
                    })
                    .tickValues([1, 2, 3, 4, 5], function (d) {
                        return d
                    })
                );

            const maxYValue = d3.max(values, v => v)
            const y = d3.scaleLinear()
                .domain([0, maxYValue + (maxYValue * 0.4)])
                .range([height - 30, 0]);
            svg.append("g")
                .attr("transform", "translate(40, 10)")
                .call(d3.axisLeft(y)
                    .tickSize(0)
                );

            if (expense.length > 0)
                svg
                    .append("path")
                    .datum(expense)
                    .attr("fill", "none")
                    .attr("stroke", "#5B93FF")
                    .attr("stroke-width", 1.5)
                    .attr("transform", "translate(40, 10)")
                    .attr("d", d3.line()
                        .x(function (d) { return x(d.key) })
                        .y(function (d) { return y(d.value) })
                        .curve(d3.curveMonotoneX)
                    )

            if (ebitda.length > 0)
                svg
                    .append("path")
                    .datum(ebitda)
                    .attr("fill", "none")
                    .attr("stroke", "#DD97E9")
                    .attr("stroke-width", 1.5)
                    .attr("transform", "translate(40, 10)")
                    .attr("d", d3.line()
                        .x(function (d) { return x(d.key) })
                        .y(function (d) { return y(d.value) })
                        .curve(d3.curveMonotoneX)
                    )
        }
    }, [expense, ebitda])

    const destroyChart = useCallback(() => {
        if (chartRef.current) {
            d3.select(chartRef.current).select("svg").remove();
            d3.select(chartRef.current).select("div").remove();
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
        <div ref={chartRef} className="linecart" style={{ width: "100%", height: "100%" }}></div>
    )
}

export default RadialChart