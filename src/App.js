import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GameLargeScreen from "./components/GameLargeScreen";
import GameMobileScreen from "./components/GameMobileScreen";

import "./App.css"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={GameLargeScreen} />
        <Route path="/join" component={GameMobileScreen} />{" "}
        {/* Route for the mobile screen */}
      </Switch>
    </Router>
  )
}

export default App;