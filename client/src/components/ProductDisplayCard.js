import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import '../css/custom.css';
import guitarsample from "./guitarsample.jpg"

export default class ProductDisplayCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            redirectToProduct: false
        }
    }



    render() {
        return (
            <div className="productCard card" onClick={()=>this.setState({redirectToProduct: true})}>
                {this.state.redirectToProduct ? <Redirect to={`/products/${this.props.product._id}`}/> : null}
                <div className="card-image">
                    <img src={guitarsample} alt="Guitar Sample" />
                </div>
                <div className="card-content">
                    <h2>{this.props.product.product_name}</h2>
                    <p>€{this.props.product.product_price}</p>
                    <p>{this.props.product.product_description}</p>
                </div>
            </div>
        )
    }
}