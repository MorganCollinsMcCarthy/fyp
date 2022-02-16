import React, { Component } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LinearProgress from '@mui/material/LinearProgress';

export default class ViewJobs extends Component {
  state = { jobs: [] };

  componentDidMount() {
    fetch("/api/job")
      .then((response) => response.json())
      .then((data) => this.setState({ jobs: data }));
  }

  handleRowClick(code) {
    this.props.history.push("/job/" + code);
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Job Status</TableCell>
              <TableCell>Algorithm</TableCell>
              <TableCell>Crash Reward</TableCell>
              <TableCell>Land Reward</TableCell>
              <TableCell>First Leg Reward</TableCell>
              <TableCell>Second Leg Reward</TableCell>
              <TableCell>Main Engine Reward</TableCell>
              <TableCell>Side Engine Reward</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.jobs.map((row) => (
              <TableRow 
              key={row.id}
              onClick={() => this.handleRowClick(row.code)}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.code}</TableCell>
                <TableCell align="left">{row.complete === false? <LinearProgress/>: "Complete" }</TableCell>
                <TableCell align="left">{row.algorithm}</TableCell>
                <TableCell align="left">{row.crash_reward}</TableCell>
                <TableCell align="left">{row.land_reward}</TableCell>
                <TableCell align="left">{row.first_leg_reward}</TableCell>
                <TableCell align="left">{row.second_leg_reward}</TableCell>
                <TableCell align="left">{row.main_engine_reward}</TableCell>
                <TableCell align="left">{row.side_engine_reward}</TableCell>
                <TableCell align="left">{row.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
