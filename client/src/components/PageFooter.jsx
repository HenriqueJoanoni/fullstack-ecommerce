import {Component} from "react";
import {guitarPick} from "../images";

export default class PageFooter extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <footer>
                    <div className="footer-full">
                        <div className="footer-header">
                            <div className="footer-header-item">
                                <img src={guitarPick} alt="Guitar Pick Icon"/>
                                <h1>FireStrings</h1>
                            </div>
                        </div>
                        <div className="footer-area">
                            <div className="footer-area-item">
                                <h3>ABOUT US</h3>
                                <p>We’re passionate about music and instruments. FireStrings is your go-to store for
                                    quality guitars and accessories.</p>
                            </div>
                            <div className="footer-area-item">
                                <h3>CUSTOMER SERVICE</h3>
                                <p><a href="/contact">Contact Us</a></p>
                                <p><a href="#">Shipping Information</a></p>
                                <p><a href="#">Return Policy</a></p>
                            </div>
                            <div className="footer-area-item">
                                <h3>MY ACCOUNT</h3>
                                <p><a href="/login">Login</a></p>
                                <p><a href="/register">Register</a></p>
                                <p><a href="#">Order History</a></p>
                            </div>
                        </div>
                    </div>
                </footer>
                <div className="second-footer">
                    <p>Copyright © Jose Henrique, Sofia Fedane, Christopher Healy - 2025</p>
                </div>
            </>
        );
    }
}