import React, { Component } from "react";
import "./App.css";
import "./index.css";
import FileUpload from "./FileUpload";
import * as d3 from 'd3';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      selected_data:[],
      sentimentColors : { positive: "green", negative: "red", neutral: "gray" }
    };
  }
  componentDidMount(){
    this.renderChart()
  }
  componentDidUpdate(){
    this.renderChart()
}
set_data = (csv_data) => {
  this.setState({ data: csv_data });
}
renderChart=()=>{
  
  var margin ={left:50,right:150,top:10,bottom:10},width = 500,height=300;
  var innerWidth = width - margin.left - margin.right
  var innerHeight = height - margin.top - margin.bottom


  const svg = d3.select("svg").attr("width", width).attr("height", height);

  const chart = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xScale = d3.scaleLinear()
    .domain(d3.extent(this.state.data, d => d["Dimension 1"]))
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain(d3.extent(this.state.data, d => d["Dimension 2"]))
    .range([0, innerHeight]);

    var brush = d3.brush().on("start brush", (e) => {

      var leftX = xScale.invert(e.selection[0][0]);
      var rightX = xScale.invert(e.selection[1][0]);
      var leftY = yScale.invert(e.selection[0][1]);
      var rightY = yScale.invert(e.selection[1][1]);

      var filtered = this.state.data.filter (item => {
        return item["Dimension 1"] >= leftX && item["Dimension 1"] <= rightX && item["Dimension 2"] >= leftY && item["Dimension 2"] <= rightY
      })

      this.setState({selected_data: filtered}, () => {

        d3.select(".child2").selectAll("p").data(this.state.selected_data)
        .join(

          enter => enter.append("p").text(d => d["Tweets"]).style("color", d => d["PredictedSentiment"] == "neutral" ? "gray" : (d["PredictedSentiment"] == "positive" ? "green" : "red")),
          update => update.text(d => d["Tweets"]).style("color", d => d["PredictedSentiment"] == "neutral" ? "gray" : (d["PredictedSentiment"] == "positive" ? "green" : "red")),
          exit => exit.remove()

        );

      });

    });

  chart.selectAll("circle").data(this.state.data).join("circle").attr("r", 5).style("fill", d => d["PredictedSentiment"] == "neutral" ? "gray" : (d["PredictedSentiment"] == "positive" ? "green" : "red") )
      .attr("cx", d => xScale(d["Dimension 1"])).attr("cy", d => yScale(d["Dimension 2"]))

  d3.select("g").call(brush);

  const text = d3.select(".child2");
  
}
  render() {
    return (
      <div>
        <FileUpload set_data={this.set_data}></FileUpload>
        <div className="parent">
          <div className="child1 item"> 
          <h2>Projected Tweets</h2> 
            <svg> </svg> 
          </div>
          <div className="child2 item overflow">
            <h2>Selected Tweets</h2> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;