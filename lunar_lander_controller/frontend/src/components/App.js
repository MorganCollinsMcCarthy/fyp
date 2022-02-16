import React, { Component } from "react";
import { render } from "react-dom";
import CreateJobs from "./CreateJobs";
import ViewJobs from "./ViewJobs";
import Job from "./Job";
import Dashboard from "./Dashboard"
import { BrowserRouter as Router} from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Router>
          <Dashboard/>
        </Router>
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);