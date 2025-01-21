import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./components/Home";
import ProductsPage from "./components/ProductsPage";
import ProductInfoPage from "./components/ProductInfoPage"

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            cart: {}
        }
    }

    updateCart = (productCode, change) => {
        let newObj = {}
        Object.keys(this.state.cart).forEach(key => {
            if (key === productCode && this.state.cart[key] + change === 0){}
            else {
                newObj[key] = this.state.cart[key] + change
            }
        })
        if (!Object.keys(this.state.cart).includes(productCode)){
            newObj[productCode] = 1
        }
        console.log(JSON.stringify(newObj))
        this.setState({cart: newObj})
    }

    removeFromCart = productCode => {
        let newObj = {}
        Object.keys(this.state.cart).forEach(key => {
            if (key!==productCode){
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
                    <Route exact path="/" component={Home} />
                    <Route exact path="/products" component={ProductsPage} />
                    <Route exact path="/products/:_id" render={(props)=><ProductInfoPage {...props} cart={this.state.cart} updateCart={this.updateCart}/>}/>      
                    {/*  ^^ Syntax taken from stack overflow to fix issue passing props through Route Components */}
                </Switch>
            </BrowserRouter>
            /* <Home/> */
            

        )
    }
}