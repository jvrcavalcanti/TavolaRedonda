import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import AuthContext from "../contexts/auth";
import AppRoutes from "./app.route";
import AuthRoutes from "./auth.route";

const Routes: React.FC = () => {
  const { signed } = useContext(AuthContext);
  console.log(signed);
  return signed ? <AppRoutes /> : <AuthRoutes/>;
};

export default Routes;