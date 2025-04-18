import React, { Component } from "react";
import "./App.css";
import "./index.css";
import FileUpload from "./FileUpload";
import * as d3 from 'd3';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      this.renderChart();
    }
  }

  set_data = (csv_data) => {
    this.setState({ data: csv_data });
  }

  renderChart = () => {

    const tooltip = d3.select("body").selectAll(".tooltip").data([0]).join("div").attr("class", "tooltip")
    .style("opacity", 0).style("background-color", "white").style("position", "absolute")
    .style("border", "1px solid gray").style("border-radius", "5px").style("padding", "5px");

    const tools = ["GPT", "Gemini", "Palm2", "Claude", "Llama"];

    d3.select(".container").selectAll("*").remove();

    const data = this.state.data;
    if (!data || data.length === 0) return;

    const stackGenerator = d3.stack().keys(tools).offset(d3.stackOffsetWiggle);
    const stackSeries = stackGenerator(data);

    const margin = { top: 20, right: 150, bottom: 50, left: 50 },
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

      let minY = 0;
      let maxY = 0;
      stackSeries.forEach(series => {
        series.forEach(d => {
          if (d[0] < minY) minY = d[0];
          if (d[1] > maxY) maxY = d[1];
        });
      });

    const xScale = d3.scaleTime().domain(d3.extent(data, d => new Date(d.Date))).range([0, width]);
    const yScale = d3.scaleLinear().domain([minY, maxY]).range([height, 0]);
    const colors = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"];

    const areaGen = d3.area()
      .x(d => xScale(d.data.Date))
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]))
      .curve(d3.curveCardinal);

    const svg = d3.select(".container").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
    const chartGroup = svg.append("g").attr("class", "chart-group").attr("transform", `translate(${margin.left}, ${margin.top})`);

    chartGroup.selectAll(".stream-area")
      .data(stackSeries)
      .join("path")
      .attr("class", "stream-area")
      .attr("d", d => areaGen(d))
      .style("fill", (d, i) => colors[i % colors.length])
      .on("mouseover", function(event, d) {

        const currentKey = d.key;
        const filteredData = data.map(item => ({
          Date: item.Date,
          Value: +item[currentKey]
        }));


        const tooltipWidth = 300;
        const tooltipHeight = 250;
        const padding = { top: 40, right: 10, bottom: 30, left: 40 };
        const tooltipInnerWidth = tooltipWidth - padding.left - padding.right;

        tooltip.html("");
      
        const svg = tooltip.append("svg")
          .attr("width", tooltipWidth)
          .attr("height", tooltipHeight);

        const maxValue = d3.max(filteredData, d => d.Value);
        const tickCount = Math.ceil(maxValue / 20);
        const tickInterval = tickCount * 20;
        const tickValues = d3.range(0, tickInterval + 1, 20);
        
        const xScaleTooltip = d3.scaleBand()
        .domain(filteredData.map(d => d.Date))
        .range([40, tooltipInnerWidth - 10])
        .padding(0.1)

        const yScaleTooltip = d3.scaleLinear()
        .domain([0, maxValue])
        .range([tooltipHeight - padding.bottom, padding.top])
        
        svg.selectAll(".tooltip-bar")
        .data(filteredData)
        .join("rect")
        .attr("class", "tooltip-bar")
        .attr("x", d => xScaleTooltip(d.Date))
        .attr("y", d => yScaleTooltip(d.Value))
        .attr("width", xScaleTooltip.bandwidth())
        .attr("height", d => yScaleTooltip(0) - yScaleTooltip(d.Value))
        .attr("fill", colors[tools.indexOf(currentKey) % colors.length]);
        
        svg.append("g")
        .attr("transform", `translate(0, ${tooltipHeight - 30})`)
        .call(d3.axisBottom(xScaleTooltip)
          .tickFormat(d => d3.timeFormat("%b")(new Date(d)))
        )
        
        svg.append("g")
        .attr("transform", "translate(40, 0)")
        .call(d3.axisLeft(yScaleTooltip)
          .tickValues(tickValues)
          .tickFormat(d3.format(".0f"))
        );
        
        tooltip
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px")
          .style("opacity", 1);
      })
      .on("mousemove", function(event, d){

        tooltip
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px")
          .style("opacity", 1);

      })
      .on("mouseout", function() {
        tooltip.style("opacity", 0);
      });

    chartGroup.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

      const legend = chartGroup.append("g")
      .attr("transform", `translate(${width + margin.left + 20}, ${margin.top})`);

      ["LLaMA-3.1", "Claude", "PaLM-2", "Gemini", "GPT-4"].reverse().forEach((key, i) => {
      const legendItem = legend.append("g")
        .attr("transform", `translate(0, ${i * 20 + 100})`);

      legendItem.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", colors[i % colors.length]);

      legendItem.append("text")
        .attr("x", 20)
        .attr("y", 12)
        .text(key)
        .style("font-size", "12px");
    });

  }

  render() {
    return (
      <div>
        <FileUpload set_data={this.set_data}></FileUpload>
        <svg className="container"></svg>
      </div>
    );
  }
}

export default App;