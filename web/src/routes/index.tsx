import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signin" exact component={SignIn} />
    </Switch>
  );
};

export default Routes;