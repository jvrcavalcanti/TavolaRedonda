import React, { useContext } from "react";
import AuthContext from "../contexts/auth";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute: React.FC = ({ component, ...rest }: any) => {
  const { signed } = useContext(AuthContext);

  const routeComponent = (props: any) => (
    signed ? React.createElement(component, props) : <Redirect to={{pathname: "/signin"}} />
  );

  return <Route {...rest} render={routeComponent} />
};

export default PrivateRoute;