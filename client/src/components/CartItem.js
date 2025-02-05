import React, { Component } from "react";
import bin1 from "../images/bin1.png"; 
import bin2 from "../images/bin2.png";
import { guitarPlay } from "../images";

export default class CartItem extends Component {
  constructor(props) {
    super(props);
  }

  handleUpdate = (newVal) => {
    if (parseInt(newVal) === 0) {
      this.props.removeFromCart(this.props.productID);
    } else {
      this.props.updateCart(this.props.productID, newVal);
    }
  };

  render() {
    return (
      <tr className="cartItem">
        <td className="cartItemDetails">
          <img
            className="cartItemImg"
            src={guitarPlay}
            alt={this.props.product.name}
          />
          <div>
            <p className="cartItemTitle">{this.props.product.name}</p>
          </div>
        </td>
        <td className="cartItemPrice">
          €{parseFloat(this.props.product.price).toFixed(2)}
        </td>
        <td className="cartQuantity">
          <input
            type="number"
            className="cartItemQuantity"
            onChange={(e) => this.handleUpdate(e.target.value)}
            value={this.props.product.qty}
            min="0"
          />
        </td>
        <td className="cartSubtotal">
          €{(this.props.product.qty * this.props.product.price).toFixed(2)}
        </td>
        <td>
          <button
            className="trashCanButton"
            onClick={() => this.props.removeFromCart(this.props.productID)}
            type="button"
          >
            <img src={bin1} alt="Remove" className="bin1" />
            <img src={bin2} alt="Remove" className="bin2" />
          </button>
        </td>
      </tr>
    );
  }
}