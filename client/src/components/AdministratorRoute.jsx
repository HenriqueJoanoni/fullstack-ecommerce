import React from 'react'
import {Route, Redirect } from "react-router-dom"

import {ACCESS_NORMAL_USER_LEVEL} from "../config/global_constants"


const LoggedInRoute = ({component: Component, exact, path, ...rest }) => 
(
    <Route
        exact = {exact}
        path = {path}
        render = {props => sessionStorage.accessLevel > ACCESS_NORMAL_USER_LEVEL ? <Component {...props} {...rest} /> : <Redirect to="/DisplayAllCars"/> }
    />
)

export default LoggedInRoute