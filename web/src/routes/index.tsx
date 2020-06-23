import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import AuthContext from "../contexts/auth";
import AuthRoutes from "./auth.routes";
import Home from "../pages/Home";
import Post from "../pages/Post";

const Routes: React.FC = () => {
  const { signed } = useContext(AuthContext);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/post/:id" component={Post} />
      {!signed && <AuthRoutes />}
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;