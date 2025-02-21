import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./components/Home";
import ProductsPage from "./components/ProductsPage";
import ProductInfoPage from "./components/ProductInfoPage"
import LoginForm from "./components/LoginForm";
import ShoppingCart from "./components/ShoppingCart"
import RegisterForm from "./components/RegisterForm";
import ContactForm from "./components/ContactForm";
import { ACCESS_GUEST_LEVEL } from './config/global_constants';
import AdminPage from "./components/AdminPage";
import LoggedInRoute from './components/LoggedInRoute';
import ProfilePage from "./components/ProfilePage";
import { ACCESS_NORMAL_USER_LEVEL } from './config/global_constants';


if (typeof sessionStorage.accessLevel === "undefined") {
    sessionStorage.firstName = "GUEST"
    sessionStorage.accessLevel = ACCESS_GUEST_LEVEL
}

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: {}
        }
    }

    addToCart = (productCode, productName, price) => {

        let newObj = {}
        Object.keys(this.state.cart).forEach(key => {
            newObj[key] = this.state.cart[key]
        })
        newObj[productCode] = {name: productName, price: price, qty: 1}
        this.setState({cart: newObj})
    }

    updateCart = (productCode, newVal) => {
        let newObj = {}
        Object.keys(this.state.cart).forEach(key => {
            if (key === productCode) {
                newObj[key] = {
                    name: this.state.cart[key].name,
                    price: this.state.cart[key].price,
                    qty: parseInt(newVal)
                }
            } else {
                newObj[key] = this.state.cart[key]
            }
        })
        {
            console.log(JSON.stringify(newObj))
        }
        this.setState({cart: newObj})
    }

    removeFromCart = productCode => {
        let newObj = {}
        Object.keys(this.state.cart).forEach(key => {
            if (key !== productCode) {
                newObj[key] = this.state.cart[key]
            }
        })

        this.setState({cart: newObj})
    }

    render() {
        return (
            <BrowserRouter>
                {console.log(this.state.cart)}
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/products" component={ProductsPage}/>
                    <Route exact path="/products/:_id" render={(props) => <ProductInfoPage {...props}
                                                                                           addToCart={this.addToCart}
                                                                                           removeFromCart={this.removeFromCart}
                                                                                           updateCart={this.updateCart}
                                                                                           cart={this.state.cart}/>}/>
                    <Route exact path="/login" component={LoginForm}/>

                    <Route exact path="/cart" render={props =>
                        <ShoppingCart {...props} removeFromCart={this.removeFromCart}
                                      updateCart={this.updateCart}
                                      cart={this.state.cart}
                        />}
                    />
                    <Route exact path="/register" component={RegisterForm}/>
                    <Route exact path="/contact" component={ContactForm}/>
                    <Route exact path="/admin" component={AdminPage} />
                    <LoggedInRoute exact path="/profile" component={ProfilePage}
                                   allowedAccessLevel={ACCESS_NORMAL_USER_LEVEL}/>

                    <Route exact path="/admin" component={AdminPage}/>
                </Switch>
            </BrowserRouter>
        )
    }
}