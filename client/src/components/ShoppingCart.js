import React, {Component} from "react"
import Header from "./Header"
import CartItem from "./CartItem"
import { gibson } from "../images"


export default class ShoppingCart extends Component {
    constructor(props){
        super(props)

        this.testObj = {
            id: 1,
            title: "Guitar",
            image: gibson,
            quantity: 2,
            price: 1400
        }
    }

    render(){
        return(
            <>
                <Header />
                <div id="shoppingCartContainer">
                    <h2>My Cart</h2>
                    <div id="cartItems">
                        {console.log(this.props.cart)}
                    {Object.keys(this.props.cart).map(itemID => <CartItem key={itemID} productID={itemID}
                                                             product={this.props.cart[itemID]}
                                                             removeFromCart={this.props.removeFromCart}
                                                             updateCart={this.props.updateCart}/>)}

                        <div id="cartTotalContainer">
                            <p>Total: €{Object.keys(this.props.cart)
                            .reduce((sum, key)=>sum+=(parseFloat(this.props.cart[key].price) * parseInt(this.props.cart[key].qty)), 0)
                            .toFixed(2)}</p>
                        </div>
                    </div>
                    <button type="button" id="checkoutButton">Checkout</button>
                    
                </div>
            </>
        )
    }
}