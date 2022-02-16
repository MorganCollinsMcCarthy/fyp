import React, { Component } from "react";
import LineChart from "./LineChart";

export default class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crashReward: -100,
      landReward: 100,
      firstLegReward: 10,
      secondLegReward: 10,
      mainEngineReward: 0.3,
      sideEngineReward: 0.03,
    };
    this.jobCode = this.props.match.params.jobCode;
    this.getJobDetails();
  }

  getJobDetails() {
    fetch("/api/get-job" + "?code=" + this.jobCode)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          crashReward: data.crash_reward,
          landReward: data.land_reward,
          firstLegReward: data.first_leg_reward,
          secondLegReward: data.second_leg_reward,
          mainEngineReward: data.main_engine_reward,
          sideEngineReward: data.side_engine_reward,
        });
      });
  }

  render() {
    return (
      <div>
        <h2>{this.jobCode}</h2>
        <p>crashReward: {this.state.crashReward}</p>
        <p>landReward: {this.state.landReward}</p>
        <p>firstLegReward: {this.state.firstLegReward}</p>
        <p>secondLegReward: {this.state.secondLegReward}</p>
        <p>mainEngineReward: {this.state.mainEngineReward}</p>
        <p>sideEngineReward: {this.state.sideEngineReward}</p>
        <LineChart code={this.jobCode}/>
      </div>
    );
  }
}
