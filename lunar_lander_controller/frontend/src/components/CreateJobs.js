import React, { Component } from "react";
import { FormControl, Grid, TextField, Button } from "@mui/material";

export default class CreateJobs extends Component {
  defaultCrashReward = -100;
  defaultLandReward = 100;
  defaultRightLegReward = 10;
  defaultLeftLegReward = 10;
  defaultMainEngineReward = -0.3;
  defaultSideEngineReward = -0.03;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container rowSpacing={1}>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required
              id="crash-reward"
              label="Crash Reward"
              type="number"
              defaultValue={this.defaultCrashReward}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              id="crash-reward"
              label="Land Reward"
              type="number"
              defaultValue={this.defaultLandReward}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              id="crash-reward"
              label="Left Leg Reward"
              type="number"
              defaultValue={this.defaultLeftLegReward}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              id="crash-reward"
              label="Right Leg Reward"
              type="number"
              defaultValue={this.defaultRightLegReward}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              id="crash-reward"
              label="Main Engine Reward"
              type="number"
              defaultValue={this.defaultMainEngineReward}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              id="crash-reward"
              label="Side Engine Reward"
              type="number"
              defaultValue={this.defaultSideEngineReward}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
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
