import React, { Component } from "react";
import CreateJobs from "./CreateJobs";
import ViewJobs from "./ViewJobs";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Routes,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<p>Home</p>} />
          <Route path="/create" element={<CreateJobs />} />
          <Route path="/view" element={<ViewJobs />} />
        </Routes>
      </Router>
    );
  }
}