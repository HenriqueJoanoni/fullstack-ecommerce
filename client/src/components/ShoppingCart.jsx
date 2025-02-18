import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./Header";
import CartItem from "./CartItem";
import BuyItem from "./BuyItem";
import PayPalMessage from "./PayPalMessage";

export default class ShoppingCart extends Component {
  calculateTotal() {
    return Object.keys(this.props.cart)
      .reduce(
        (sum, key) =>
          sum + parseFloat(this.props.cart[key].price) * parseInt(this.props.cart[key].qty),
        0
      )
      .toFixed(2);
  }

  resetCart = () => {
    this.props.updateCart({});
  };

  render() {
    const { cart } = this.props;
    const isCartEmpty = Object.keys(cart).length === 0;
    const total = this.calculateTotal();

    return (
      <>
        <Header />
        <div id="shoppingCartContainer">
          <h2>Shopping Cart</h2>
          {isCartEmpty ? (
            <p style={{ textAlign: "center", color: "#888" }}>
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
                  {Object.keys(cart).map((itemID) => (
                    <CartItem
                      key={itemID}
                      productID={itemID}
                      product={cart[itemID]}
                      removeFromCart={this.props.removeFromCart}
                      updateCart={this.props.updateCart}
                    />
                  ))}
                </tbody>
              </table>
              <div id="cartTotalContainer">
                <p>
                  <strong>Total: </strong>€{total}
                </p>
              </div>
              <div id="paypalButtonContainer">
                <BuyItem price={total} itemID="cart" />
              </div>
            </>
          )}
        </div>
        <Route path="/PayPalMessage/:messageType/:payPalPaymentID" render={(props) => (
          <PayPalMessage {...props} resetCart={this.resetCart} />
        )} />
      </>
    );
  }
}
