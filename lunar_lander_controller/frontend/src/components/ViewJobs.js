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
              <TableCell>Code</TableCell>
              <TableCell>Algorithm</TableCell>
              <TableCell>Crash Reward</TableCell>
              <TableCell>Land Reward</TableCell>
              <TableCell>First Leg Reward</TableCell>
              <TableCell>Second Leg Reward</TableCell>
              <TableCell>Main Engine Reward</TableCell>
              <TableCell>Side Engine Reward</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.jobs.map((row) => (
              <TableRow
              key={row.id}
              hover
              onClick={() => this.handleRowClick(row.code)}
              style={{ cursor: "pointer"}}
              >
                <TableCell align="left">{row.code}</TableCell>
                <TableCell align="left">{row.algorithm}</TableCell>
                <TableCell align="left">{row.crash_reward}</TableCell>
                <TableCell align="left">{row.land_reward}</TableCell>
                <TableCell align="left">{row.first_leg_reward}</TableCell>
                <TableCell align="left">{row.second_leg_reward}</TableCell>
                <TableCell align="left">{row.main_engine_reward}</TableCell>
                <TableCell align="left">{row.side_engine_reward}</TableCell>
                <TableCell align="left">{row.complete === false? <LinearProgress/>: "Complete" }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
