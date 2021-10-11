import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import LazyLoadModal from "./common/components/LazyLoadModal";
import PrivateRoute from "./common/hoc/private-route";

import Authentication from "./features/authentication";
import Dashboard from "./features/dashboard";
import Articles from "./features/dashboard/search";
import ArticleCreate from "./features/dashboard/create";
import Settings from "./features/settings";
import ArticlesView from "./features/articles";
import ArticlesList from "./features/articles/articles-list";

// include global stylings
import "./global.scss";

const Routes = () => {
    return (
        <>
            <Suspense fallback={<LazyLoadModal />}>
                <Switch>
                    <Route
                        path="/"
                        render={() => {
                            window.location.href = "home.html";
                        }}
                        exact
                    />

                    <Route
                        path="/profile"
                        render={() => {
                            window.location.href = "profile.html";
                        }}
                        exact
                    />

                    <Route
                        path="/vascular"
                        render={() => {
                            window.location.href = "vascular.html";
                        }}
                        exact
                    />

                    {/* remove `exact` keyword if route has nested routes */}
                    <Route path="/admin" component={Authentication} exact />

                    <Route path="/articles" component={ArticlesList} exact />

                    <Route
                        path="/articles/:id"
                        component={ArticlesView}
                        exact
                    />

                    <PrivateRoute
                        path="/dashboard"
                        component={Dashboard}
                        exact
                    />

                    <PrivateRoute
                        path="/dashboard-articles/:id"
                        component={Articles}
                        exact
                    />

                    <PrivateRoute
                        path="/dashboard-articles-create"
                        component={ArticleCreate}
                        exact
                    />

                    <PrivateRoute path="/settings" component={Settings} exact />

                    {/* <Redirect path="*" to="/" /> */}
                </Switch>
            </Suspense>
        </>
    );
};

export default Routes;
