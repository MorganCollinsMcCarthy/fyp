import React, { Component } from "react";
import LineChart from "./LineChart";
import {
  FormControl,
  Grid,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import Paper from "@mui/material/Paper";

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
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <React.Fragment>
                <Title>rollout_ep_rew_mean</Title>
                <LineChart code={this.jobCode} type="rollout_ep_rew_mean" />
              </React.Fragment>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <React.Fragment>
                <Title>rollout_ep_len_mean</Title>
                <LineChart code={this.jobCode} type="rollout_ep_len_mean" />
              </React.Fragment>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
