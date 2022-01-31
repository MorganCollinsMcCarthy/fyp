import React, { Component } from "react";

export default class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crashReward: -100,
      landReward: 100,
      leftLegReward: 10,
      rightLegReward: 10,
      mainEngineReward: -0.3,
      sideEngineReward: -0.03,
    };
  }

  render(){
      return <div>
          <p>crashReward: {this.state.crashReward}</p>
          <p>landReward: {this.state.landReward}</p>
          <p>leftLegReward: {this.state.leftLegReward}</p>
          <p>rightLegReward: {this.state.rightLegReward}</p>
          <p>mainEngineReward: {this.state.mainEngineReward}</p>
          <p>sideEngineReward: {this.state.sideEngineReward}</p>
      </div>
  }
}
