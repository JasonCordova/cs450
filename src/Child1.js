import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {

  }
  componentDidUpdate(){

    const margin = { top: 60, right: 60, bottom: 60, left: 60 };
    const width = 600;
    const height = 400;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(".container").attr("width", width).attr("height", height);
    const innerChart = svg.select(".inner_chart").attr("transform", `translate(${margin.left}, ${margin.top})`);
    const xScale = d3.scaleLinear().domain([0, d3.max(this.props.data, d => d.total)]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, d3.max(this.props.data, d => d.tips)]).range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    innerChart.selectAll(".x-axis").data([null]) // Just a placeholder for the axis, as we're not using dynamic data for it.
      .join("g").attr('class','x-axis') //we have to assign the class we use for selection
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis);

    innerChart.selectAll(".y-axis").data([null]) // Similarly, just a placeholder for the axis.
      .join("g").attr('class','y-axis') //we have to assign the class we use for selection
      .call(yAxis);


    innerChart.append("text").text("Total Bill vs Tips").attr("x", innerWidth/2 - 60).attr("y", -10).attr("font-size", "16px");
    innerChart.selectAll(".x-axis").append("text").text("Total Bill").attr("x", innerWidth/2).attr("y", 40).attr("fill", "black").attr("font-size", "16px");
    innerChart.selectAll(".y-axis").append("text").text("Tips").attr("text-anchor", "middle").attr("x", -innerHeight/2).attr("y", -40).attr("fill", "black").attr("font-size", "16px").attr("transform", "rotate(-90)")

    innerChart.selectAll("circle").data(this.props.data).join("circle").attr("r", 5).attr("fill", "#68b3a2")
      .attr("cx", d => xScale(d.total)).attr("cy", d => yScale(d.tips))

    d3.select(".y-axis").selectAll(".tick line").attr("x2", innerWidth).attr("stroke-dasharray", "2,2").attr("stroke", "lightgray");
    d3.select(".x-axis").selectAll(".tick line").attr("y1", -innerHeight).attr("stroke-dasharray", "2,2").attr("stroke", "lightgray");
    

  }

  render() {
    return <svg className="container">
        <g className="inner_chart"></g>
    </svg>
  }
}

export default Child1;