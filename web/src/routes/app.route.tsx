import React from "react";
import { Switch, Route } from "react-router-dom";
import Profile from "../pages/Profile";

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/profile" exact component={Profile} />
    </Switch>
  );
};

export default AppRoutes;