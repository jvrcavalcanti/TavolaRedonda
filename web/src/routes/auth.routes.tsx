import React from "react";
import { Route } from "react-router";
import SignIn from "../pages/SignIn";

const AuthRoutes: React.FC = () => (
  <>
    <Route path="/signin" exact component={SignIn} />
  </>
);

export default AuthRoutes;