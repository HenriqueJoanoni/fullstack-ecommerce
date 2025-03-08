import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

export default class PayPalMessage extends Component {
    static messageType = {
        SUCCESS: "success",
        ERROR: "error",
        CANCEL: "cancel"
    };

    constructor(props) {
        super(props);

        this.state = {
            heading: "",
            message: "",
            icon: "",
            buttonColour: "red-button",
            payPalPaymentID: null,
            messageType: null,
            redirectToCart: false
        };
    }

    componentDidMount() {
        const {messageType, payPalPaymentID} = this.props.match.params;

        this.setState({messageType, payPalPaymentID}, () => {
            this.updateMessageContent();

            if (messageType === PayPalMessage.messageType.SUCCESS) {
                if (typeof this.props.resetCart === 'function') {
                    this.props.resetCart();
                }

                setTimeout(() => {
                    this.setState({redirectToCart: true});
                }, 3000);
            }
        });
    }

    updateMessageContent = () => {
        const {messageType} = this.state;

        switch (messageType) {
            case PayPalMessage.messageType.SUCCESS:
                this.setState({
                    heading: "Payment Successful!",
                    message: "Thank you for your purchase! Your PayPal transaction was successfully completed.",
                    icon: "✓",
                    buttonColour: "green-button"
                });
                break;

            case PayPalMessage.messageType.CANCEL:
                this.setState({
                    heading: "Payment Cancelled",
                    message: "The transaction was cancelled. This could be due to an action on your side or an issue with PayPal. Please try again.",
                    icon: "!"
                });
                break;

            case PayPalMessage.messageType.ERROR:
                this.setState({
                    heading: "Payment Error",
                    message: "An error occurred during the transaction. The transaction was not completed. " +
                        "Please try again. If the problem persists, contact our support team.",
                    icon: "✕"
                });
                break;

            default:
                this.setState({
                    heading: "Transaction Status Unknown",
                    message: "The transaction result could not be determined.",
                    icon: "?"
                });
        }
    }

    render() {
        if (this.state.redirectToCart) {
            return <Redirect to="/cart"/>;
        }

        const messageClass = this.state.messageType
            ? `message-${this.state.messageType}`
            : "";

        return (
            <div className="payPalMessage">
                <div className={`payPalMessageCard ${messageClass}`}>
                    <div className="status-icon">
                        {this.state.icon}
                    </div>
                    <h3>{this.state.heading}</h3>
                    <p className="message-content">{this.state.message}</p>

                    {this.state.messageType === PayPalMessage.messageType.SUCCESS && (
                        <p className="payment-id">
                            Transaction ID: <span>{this.state.payPalPaymentID}</span>
                        </p>
                    )}

                    <div className="button-container">
                        <Link className={this.state.buttonColour} to="/cart">
                            Back to Cart
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}