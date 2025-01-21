import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./components/Home";
import ProductsPage from "./components/ProductsPage";
import ProductInfoPage from "./components/ProductInfoPage"
import LoginForm from "./components/LoginForm";

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/products" component={ProductsPage} />
                    <Route exact path="/products/:_id" component={ProductInfoPage} />
                    <Route exact path="/login" component={LoginForm} />
                </Switch>
            </BrowserRouter>
        )
    }
}