import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import '../css/custom.css';
import {guitarPlay} from '../images';


export default class ProductDisplayCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectToProduct: false
        }
    }

    render() {
        return (
            <div className="productCard card" onClick={() => this.setState({redirectToProduct: true})}>
                {this.state.redirectToProduct ? <Redirect to={`/products/${this.props.product._id}`}/> : null}
                <div className="card-image">
                    <img src={guitarPlay} alt="Guitar Sample"/>
                </div>
                <div className="card-content">
                    <h2>{this.props.product.product_name}</h2>

                    {this.props.product.product_deal.is_deal === true ?
                        <p style={{display: "flex", gap: "5px"}}>
                            Was: <s>€{this.props.product.product_price}</s>
                            Now: €{this.props.product.product_deal.discount_price}
                        </p> :
                        <p>€{this.props.product.product_price}</p>
                    }

                    <p>{this.props.product.product_description}</p>
                    {this.props.product.product_deal.is_deal === true ?
                        <p><strong>Deal valid until: </strong>{this.props.product.product_deal.deal_deadline}</p>
                        : ""}
                </div>
            </div>
        )
    }
}