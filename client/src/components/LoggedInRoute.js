import React, {Component} from "react"
import {Route, Redirect} from "react-router-dom"

const LoggedInRoute = ({ component: Component, exact, path, allowedAccessLevel, ...rest }) => {
    const userAccessLevel = parseInt(sessionStorage.getItem("accessLevel"), 10)

    return (
        <Route
            exact={exact}
            path={path}
            render={props =>
                userAccessLevel >= allowedAccessLevel ? (
                    <Component {...props} {...rest} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    )
}

export default LoggedInRoute