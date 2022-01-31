import React, { Component } from "react";
import CreateJobs from "./CreateJobs";
import ViewJobs from "./ViewJobs";
import Job from "./Job";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <p>Home</p>
          </Route>
          <Route path="/create" component={CreateJobs} />
          <Route path="/view" component={ViewJobs} />
          <Route path="/job/:jobCode" component={Job} />
        </Switch>
      </Router>
    );
  }
}