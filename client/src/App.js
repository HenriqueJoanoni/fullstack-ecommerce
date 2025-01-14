import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./components/Home";
import ProductsPage from "./components/ProductsPage";


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/products" component={ProductsPage} />
                </Switch>
            </BrowserRouter>
            /* <Home/> */
            

        )
    }
}