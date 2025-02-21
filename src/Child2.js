import React, { Component } from "react";
import * as d3 from "d3";

class Child2 extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {

  }
  componentDidUpdate(){

    console.log(this.props.data2);

    const groupedData = d3.group(this.props.data2, d => d.day);
    const avgData = Array.from(groupedData, ([day, values]) => ({day, avgTip: d3.mean(values, d => d.tips)}));

    const margin = { top: 60, right: 60, bottom: 60, left: 60 };
    const width = 600;
    const height = 400;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(".container2").attr("width", width).attr("height", height);
    const innerChart = svg.select(".inner_chart2").attr("transform", `translate(${margin.left}, ${margin.top})`);
    const xScale = d3.scaleBand().domain(avgData.map(d => d.day)).range([0, innerWidth]).padding(0.2);
    const yScale = d3.scaleLinear().domain([0, d3.max(avgData, d => d.avgTip)]).range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    innerChart.selectAll(".x-axis").data([null]) // Just a placeholder for the axis, as we're not using dynamic data for it.
      .join("g").attr('class','x-axis') //we have to assign the class we use for selection
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis);

    innerChart.selectAll(".y-axis").data([null]) // Similarly, just a placeholder for the axis.
      .join("g").attr('class','y-axis') //we have to assign the class we use for selection
      .call(yAxis);


    innerChart.append("text").text("Average Tip by Day").attr("x", innerWidth/2 - 60).attr("y", -10).attr("font-size", "16px");
    innerChart.selectAll(".x-axis").append("text").text("Day").attr("x", innerWidth/2).attr("y", 40).attr("fill", "black").attr("font-size", "16px");
    innerChart.selectAll(".y-axis").append("text").text("Average Tip").attr("text-anchor", "middle").attr("x", -innerHeight/2).attr("y", -40).attr("fill", "black").attr("font-size", "16px").attr("transform", "rotate(-90)")

    innerChart.selectAll("rect").data(avgData).join("rect").attr("x", d => xScale(d.day)).attr("fill", "#68b3a2").attr("y", d => yScale(d.avgTip))
      .attr("width", d => xScale.bandwidth()).attr("height", d => innerHeight - yScale(d.avgTip))

    d3.select(".y-axis").selectAll(".tick line").attr("x2", innerWidth).attr("stroke-dasharray", "2,2").attr("stroke", "lightgray");
    d3.select(".x-axis").selectAll(".tick line").attr("y1", -innerHeight).attr("stroke-dasharray", "2,2").attr("stroke", "lightgray");
    

  }

  render() {
    return <svg className="container2">
        <g className="inner_chart2"></g>
    </svg>
  }
}

export default Child2;