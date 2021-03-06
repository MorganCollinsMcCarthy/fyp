import React, { Component } from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import ReactPlayer from "react-player";
import {
  FormControl,
  Grid,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import Paper from "@mui/material/Paper";
import { saveAs } from "file-saver";

export default class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      crashReward: -100,
      landReward: 100,
      firstLegReward: 10,
      secondLegReward: 10,
      mainEngineReward: 0.3,
      sideEngineReward: 0.03,
      dqn: true,
      a2c: false,
      ars: false,
      trpo: false,
      ppo: false,
      qrdqn: false,
      url:
        "/reinforcement_learning/logs/" +
        this.props.match.params.jobCode +
        "/DQN",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.jobCode = this.props.match.params.jobCode;
    this.getJobDetails();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({
      url:
        "/reinforcement_learning/logs/" + this.jobCode + "/" + e.target.value,
    });
  }

  handleDownload(file) {
    saveAs(this.state.url + "/" + file);
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
          dqn: data.dqn,
          a2c: data.a2c,
          ars: data.ars,
          trpo: data.trpo,
          ppo: data.ppo,
          qrdqn: data.qrdqn,
          loaded: true,
        });
      });
  }

  render() {
    return (
      <div>
        <Title>{this.jobCode}</Title>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, display: "flex", flexDirection: "column" }}>
              <Title>{this.state.url + "/output.mp4"}</Title>
              <Grid container>
                <Grid item xs={7}>
                  <ReactPlayer
                    playing={true}
                    loop={true}
                    muted={true}
                    url={this.state.url + "/output.mp4"}
                  />
                </Grid>
                <Grid item xs={5}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      name="algorithm"
                      defaultValue="DQN"
                      onChange={this.handleChange}
                    >
                      <FormControlLabel
                        value="DQN"
                        control={<Radio color="primary" />}
                        label="DQN"
                        labelPlacement="top"
                      />
                      <FormControlLabel
                        value="A2C"
                        control={<Radio color="primary" />}
                        label="A2C"
                        labelPlacement="top"
                      />
                      <FormControlLabel
                        value="ARS"
                        control={<Radio color="primary" />}
                        label="ARS"
                        labelPlacement="top"
                      />
                      <FormControlLabel
                        value="TRPO"
                        control={<Radio color="primary" />}
                        label="TRPO"
                        labelPlacement="top"
                      />
                      <FormControlLabel
                        value="PPO"
                        control={<Radio color="primary" />}
                        label="PPO"
                        labelPlacement="top"
                      />
                      <FormControlLabel
                        value="QRDQN"
                        control={<Radio color="primary" />}
                        label="QRDQN"
                        labelPlacement="top"
                      />
                    </RadioGroup>
                  </FormControl>
                    <BarChart
                      url={this.state.url}
                      type="rollout_ep_rew_mean"
                    />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleDownload("best_model.zip")}
                  >
                    Model
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleDownload("tfevents.0")}
                  >
                    Tensorboard
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleDownload("progress.csv")}
                  >
                    CSV
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Title>rollout_ep_rew_mean</Title>
              {this.state.loaded && (
                <LineChart
                  code={this.jobCode}
                  type="rollout_ep_rew_mean"
                  dqn={this.state.dqn}
                  a2c={this.state.a2c}
                  ars={this.state.ars}
                  trpo={this.state.trpo}
                  ppo={this.state.ppo}
                  qrdqn={this.state.qrdqn}
                />
              )}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Title>rollout_ep_len_mean</Title>
              {this.state.loaded && (
                <LineChart
                  code={this.jobCode}
                  type="rollout_ep_len_mean"
                  dqn={this.state.dqn}
                  a2c={this.state.a2c}
                  ars={this.state.ars}
                  trpo={this.state.trpo}
                  ppo={this.state.ppo}
                  qrdqn={this.state.qrdqn}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
