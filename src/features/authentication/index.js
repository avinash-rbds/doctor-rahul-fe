import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Login from "./login";

const Auth = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // redirect user to dashboard when logged in
  const redirectPath = "/dashboard";

  if (isLoggedIn !== null) {
    return <Redirect to={redirectPath} />;
  } else {
    return (
      <Switch>
        <Route path="" component={Login} />
      </Switch>
    );
  }
};
export default Auth;
