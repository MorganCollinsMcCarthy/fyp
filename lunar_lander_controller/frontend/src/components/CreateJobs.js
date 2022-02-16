import React, { Component } from "react";
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

export default class CreateJobs extends Component {
  defaultCrashReward = -100;
  defaultLandReward = 100;
  defaultSecondLegReward = 10;
  defaultFirstLegReward = 10;
  defaultMainEngineReward = 0.3;
  defaultSideEngineReward = 0.03;
  defaultAlgorithm = "DQN";

  constructor(props) {
    super(props);
    this.state = {
      crashReward: this.defaultCrashReward,
      landReward: this.defaultLandReward,
      firstLegReward: this.defaultFirstLegReward,
      secondLegReward: this.defaultSecondLegReward,
      mainEngineReward: this.defaultMainEngineReward,
      sideEngineReward: this.defaultSideEngineReward,
      algorithm: this.defaultAlgorithm,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRunButtonPressed = this.handleRunButtonPressed.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleRunButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        crash_reward: this.state.crashReward,
        land_reward: this.state.landReward,
        first_leg_reward: this.state.firstLegReward,
        second_leg_reward: this.state.secondLegReward,
        main_engine_reward: this.state.mainEngineReward,
        side_engine_reward: this.state.sideEngineReward,
        algorithm: this.state.algorithm,
      }),
    };
    fetch("/api/create-job", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              height: 240,
              "& .MuiTextField-root": { m: 1, width: "28ch" },
            }}
          >
            <React.Fragment>
              <Title>Rewards</Title>
              <FormControl>
                <TextField
                  required
                  id="crash-reward"
                  label="Crash Reward"
                  type="number"
                  name="crashReward"
                  onChange={this.handleChange}
                  defaultValue={this.defaultCrashReward}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  required
                  id="land-reward"
                  label="Land Reward"
                  type="number"
                  name="landReward"
                  onChange={this.handleChange}
                  defaultValue={this.defaultLandReward}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  required
                  id="first-leg-reward"
                  label="First Leg Reward"
                  type="number"
                  name="firstLegReward"
                  onChange={this.handleChange}
                  defaultValue={this.defaultFirstLegReward}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  required
                  id="second-leg-reward"
                  label="Second Leg Reward"
                  type="number"
                  name="secondLegReward"
                  onChange={this.handleChange}
                  defaultValue={this.defaultSecondLegReward}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  required
                  id="main-engine-reward"
                  label="Main Engine Reward"
                  type="number"
                  name="mainEngineReward"
                  onChange={this.handleChange}
                  defaultValue={this.defaultMainEngineReward}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  required
                  id="side-engine-reward"
                  label="Side Engine Reward"
                  type="number"
                  name="sideEngineReward"
                  onChange={this.handleChange}
                  defaultValue={this.defaultSideEngineReward}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </React.Fragment>
          </Paper>
        </Grid>
        {/* Algorithms*/}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <React.Fragment>
              <Title>Algorithms</Title>
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
                    value="TEST"
                    control={<Radio color="primary" />}
                    label="TEST"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="TEST"
                    control={<Radio color="primary" />}
                    label="TEST"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="TEST"
                    control={<Radio color="primary" />}
                    label="TEST"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="TEST"
                    control={<Radio color="primary" />}
                    label="TEST"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="TEST"
                    control={<Radio color="primary" />}
                    label="TEST"
                    labelPlacement="top"
                  />
                </RadioGroup>
              </FormControl>
            </React.Fragment>
          </Paper>
        </Grid>

        <Grid item xs={12} align="right">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleRunButtonPressed}
          >
            Run
          </Button>
        </Grid>
      </Grid>
    );
  }
}
