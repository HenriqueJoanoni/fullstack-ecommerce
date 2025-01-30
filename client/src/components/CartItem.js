import React, {Component} from "react"
import { trashCan } from "../images"

export default class CartItem extends Component {
    constructor(props){
        super(props)
    }

    handleUpdate = newVal => {
        if (parseInt(newVal)===0){
            this.props.removeFromCart(this.props.productID)
        } else {
            this.props.updateCart(this.props.productID, newVal)
        }
    }

    

    render(){
        return (
            <div className="cartItem">
                <div>
                    <button className="trashCanButton" onClick={()=>{this.props.removeFromCart(this.props.productID)}} type="button"><img src={trashCan}/></button>
                    {/*<img className="cartItemImg" src={this.props.product.image}/> */}
                    <p className="cartItemTitle">{this.props.product.name}</p>
                </div>

                <div>
                    <input className="cartItemQuantity" type="number" onChange={e=>{this.handleUpdate(e.target.value)}} value={this.props.product.qty} min="0"/>
                    <p className="cartItemPrice">€{(this.props.product.qty * this.props.product.price).toFixed(2)}</p>
                </div>
                

            </div>
        )
    }


}