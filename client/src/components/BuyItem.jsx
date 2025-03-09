import React, {Component} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {SANDBOX_CLIENT_ID, SERVER_HOST} from "../config/global_constants";
import PayPalMessage from "./PayPalMessage";
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";

export default class BuyItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToPayPalMessage: false,
            payPalMessageType: null,
            payPalPaymentID: null,
        };
    }

    createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: this.props.total,
                    breakdown: {
                        item_total: {
                            value: this.props.total,
                            currency_code: "EUR"
                        }
                    }
                },
                items: Object.values(this.props.cart).map(item => ({
                    name: item.name,
                    quantity: item.qty,
                    unit_amount: {
                        value: item.price,
                        currency_code: "EUR"
                    }
                }))
            }]
        });
    };

    onApprove = (paymentData) => {
        const token = sessionStorage.getItem('authToken');
        const cartItems = Object.values(this.props.cart);

        const parameters = {
            orderID: paymentData.orderID,
            products: cartItems.map(item => ({
                productId: item._id,
                quantity: item.qty,
                price: item.price,
                productName: item.name,
            })),
            total: Number(this.props.total),
            user_email: sessionStorage.getItem('email'),
        };

        axios.post(`${SERVER_HOST}/sales`, parameters, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                this.setState({
                    payPalMessageType: PayPalMessage.messageType.SUCCESS,
                    payPalPaymentID: paymentData.orderID,
                    redirectToPayPalMessage: true,
                });
            })
            .catch((errorData) => {
                this.setState({
                    payPalMessageType: PayPalMessage.messageType.ERROR,
                    redirectToPayPalMessage: true,
                    message: errorData
                });
            });
    };

    onError = (errorData) => {
        this.setState({
            payPalMessageType: PayPalMessage.messageType.ERROR,
            redirectToPayPalMessage: true,
            message: errorData
        });
    };

    onCancel = (cancelData) => {
        this.setState({
            payPalMessageType: PayPalMessage.messageType.CANCEL,
            redirectToPayPalMessage: true,
            message: cancelData
        });
    };

    render() {
        return (
            <div>
                {this.state.redirectToPayPalMessage ? (
                    <Redirect
                        to={`/PayPalMessage/${this.state.payPalMessageType}/${this.state.payPalPaymentID}`}
                    />
                ) : null}

                <PayPalScriptProvider options={{currency: "EUR", "client-id": SANDBOX_CLIENT_ID}}>
                    <PayPalButtons
                        style={{layout: "horizontal"}}
                        fundingSource="card"
                        createOrder={this.createOrder}
                        onApprove={this.onApprove}
                        onError={this.onError}
                        onCancel={this.onCancel}
                    />
                </PayPalScriptProvider>
            </div>
        );
    }
}
