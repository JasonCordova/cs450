import React, { Component } from "react";
import * as d3 from "d3";
import tips from './tips.csv';
import Child1 from './Child1.js';
import Child2 from "./Child2.js";

class App extends Component {
  constructor(props){
    super(props)
    this.state = { data: [] };
  }
  componentDidMount() {
  
    var self = this;
    d3.csv(tips, function(csvData){
      return {
        tips: parseFloat(csvData.tip),
        total: parseFloat(csvData.total_bill),
        day: csvData.day,
      }
    }).then(function(d){self.setState({data: d})})
    .catch(function(err){console.log(err);})

  }
  componentDidUpdate(){
  }

  render() {
    return <div className="parent">

      <div className="child1">
        <Child1 data={this.state.data}/>
      </div>

      <div className="child2">
      <Child2 data2={this.state.data}/>
      </div>

    </div>
  }
}

export default App;