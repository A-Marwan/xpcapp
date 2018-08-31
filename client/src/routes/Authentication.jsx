import React from "react";
import {Route} from "react-router-dom";
import LoginPage from "../views/Login";
import LogoutPage from "../views/Logout";
import RegisterPage from "../views/Register";
import RequireAuthentication from "../hoc/Authentication/RequireAuthentication"
import NoRequireAuthentication from "../hoc/Authentication/NoRequireAuthentication"

let authenticationRoutes = [
    <Route path="/login" component={NoRequireAuthentication(LoginPage)} exact={true} key="login"/>,
    <Route path="/logout" component={RequireAuthentication(LogoutPage)} exact={true} key="logout"/>,
    <Route path="/register" component={NoRequireAuthentication(RegisterPage)} exact={true} key="register"/>,
];

export default authenticationRoutes;
