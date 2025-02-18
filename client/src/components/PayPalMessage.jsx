import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

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
            buttonColour: "red-button",
            payPalPaymentID: null,
            messageType: null,
            redirectToCart: false
        };
    }
    
    componentDidMount() {
        const { messageType, payPalPaymentID } = this.props.match.params;
        
        this.setState({ messageType, payPalPaymentID }, () => {
            this.updateMessageContent();

            if (messageType === PayPalMessage.messageType.SUCCESS) {
                this.props.resetCart(); 
                
                setTimeout(() => {
                    this.setState({ redirectToCart: true });
                }, 3000); 
            }
        });
    }

    updateMessageContent = () => {
        const { messageType } = this.state;
        
        switch(messageType) {
            case PayPalMessage.messageType.SUCCESS:
                this.setState({
                    heading: "PayPal Transaction Confirmation",
                    message: "Your PayPal transaction was successful.",
                    buttonColour: "green-button"
                });
                break;
                
            case PayPalMessage.messageType.CANCEL:
                this.setState({
                    heading: "PayPal Transaction Cancelled",
                    message: "It appears the transaction was cancelled, but it may also be due to an issue with PayPal. Please try again."
                });
                break;
                
            case PayPalMessage.messageType.ERROR:
                this.setState({
                    heading: "PayPal Transaction Error",
                    message: "An error occurred when trying to perform your PayPal transaction. The transaction was not completed. Please try again."
                });
                break;
                
            default:
                console.error("Invalid messageType:", messageType);
                this.setState({
                    heading: "Transaction Status Unknown",
                    message: "The transaction result could not be determined."
                });
        }
    }

    render() {
        if (this.state.redirectToCart) {
            return <Redirect to="/shopping-cart" />;
        }

        return (
            <div className="payPalMessage">
                <h3>{this.state.heading}</h3>
                <p>{this.state.message}</p>
                
                {this.state.messageType === PayPalMessage.messageType.SUCCESS && 
                    <p>Your PayPal payment confirmation is: 
                        <span id="payPalPaymentID">{this.state.payPalPaymentID}</span>
                    </p>
                }
                
                <p id="payPalPaymentIDButton">
                    <Link className={this.state.buttonColour} to="/shopping-cart">
                        Continue to Cart
                    </Link>
                </p>
            </div>
        );
    }
}
