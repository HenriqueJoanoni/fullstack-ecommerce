import React, {Component} from "react"
import '../css/custom.css';
import guitarsample from "./guitarsample.jpg"

export default class ProductDisplayCard extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="productCard card">
                <div className="card-image">
                    <img src={guitarsample} alt="Guitar Sample" />
                </div>
                <div className="card-content">
                    <h2>{this.props.product.name}</h2>
                    <p>€{this.props.product.price}</p>
                    <p>{this.props.product.description}</p>
                </div>
            </div>
        )
    }
}