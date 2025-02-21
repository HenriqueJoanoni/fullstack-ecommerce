import React, {Component} from "react";
import Header from "./Header";
import CartItem from "./CartItem";

export default class ShoppingCart extends Component {

    render() {
        const isCartEmpty = Object.keys(this.props.cart).length === 0;

        return (
            <>
                <Header/>
                <div id="shoppingCartContainer">
                    <h2>Shopping Cart</h2>
                    {isCartEmpty ? (
                        <p style={{textAlign: "center", color: "#888"}}>
                            Shopping Cart is empty.
                        </p>
                    ) : (
                        <>
                            <table className="cartTable">
                                <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.keys(this.props.cart).map((itemID) => (
                                    <CartItem
                                        key={itemID}
                                        productID={itemID}
                                        product={this.props.cart[itemID]}
                                        removeFromCart={this.props.removeFromCart}
                                        updateCart={this.props.updateCart}
                                    />
                                ))}
                                </tbody>
                            </table>

                            <div id="cartTotalContainer">
                                <p>
                                    <strong>Total: </strong>
                                    €{Object.keys(this.props.cart)
                                    .reduce(
                                        (sum, key) => sum + parseFloat(this.props.cart[key].price) * parseInt(this.props.cart[key].qty), 0
                                    )
                                    .toFixed(2)}
                                </p>
                            </div>
                        </>
                    )}

                    <button
                        type="button"
                        id="checkoutButton"
                        disabled={isCartEmpty}
                        style={{
                            backgroundColor: isCartEmpty ? "#d3d3d3" : "#2b2b2b",
                            cursor: isCartEmpty ? "not-allowed" : "pointer",
                        }}
                    >
                        Proceed To Checkout
                    </button>
                </div>
            </>
        );
    }
}