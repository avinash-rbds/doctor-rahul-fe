import React, { Component } from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import Details from "./details";
import Articles from "./search";

const Dashboard = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={path} component={Details} exact />
            <Route path={`${path}/articles/:id`} component={Articles} exact />
            <Redirect from={`${path}/articles/`} to="/" />
        </Switch>
    );
};

// class Dashboard extends Component {
//   render() {
//     const { path } = this.props.match;
//     console.log("#", path);

//     return (
//       <Switch>
//         <Route path={path} component={Details} exact />
//         <Route path={`${path}/search`} component={Search} exact />

//         <Redirect from={`${path}`} to={`${path}`} />
//       </Switch>
//     );
//   }
// }

export default Dashboard;
