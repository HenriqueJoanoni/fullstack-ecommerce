import React, {Component} from "react";
import Header from "./Header";
import Footer from "./PageFooter";
import {clockIcon, gpsIcon, phoneIcon} from "../images";

export default class ContactForm extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <>
                <div className="app-container">
                    <div className="header-container">
                        <Header/>
                    </div>
                    <div className="page-container">
                        Contact us
                    </div>
                    <div className="background-banner"></div>
                    <div className="contact-section">
                        <div className="contact-form-card">
                            <div className="contact-form-card-row">
                                <div className="contact-info">
                                    <div className="contact-info-item">
                                        <img src={gpsIcon} alt="GPS Icon" />
                                        <div>
                                            <h3>Store Address</h3>
                                            <p>Institute of Technology</p>
                                            <p>Dublin Rd</p>
                                            <p>Marshes Upper</p>
                                            <p>Dundalk, Co. Louth</p>
                                            <p>A91 K584</p>
                                            <p>Ireland</p>
                                        </div>
                                    </div>

                                    <div className="contact-info-item">
                                        <img src={phoneIcon} alt="Phone Icon" />
                                        <div>
                                            <h3>Call Us</h3>
                                            <p>Tel: +353 42 937 0200</p>
                                        </div>
                                    </div>

                                    <div className="contact-info-item">
                                        <img src={clockIcon} alt="Clock Icon" />
                                        <div>
                                            <h3>Store Hours</h3>
                                            <p>Monday-Friday: 11am-6pm</p>
                                            <p>Saturday: 10am-6pm</p>
                                            <p>Sunday: 12:30pm-6pm</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-form">
                                    <h3>We're happy to hear from you</h3>
                                    <form>
                                        <div className="form-group">
                                            <label>Your Name *</label>
                                            <input type="text" placeholder="Your Name" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Your Email *</label>
                                            <input type="email" placeholder="Your Email" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Message *</label>
                                            <textarea placeholder="Message" rows="5" required></textarea>
                                        </div>
                                        <button type="submit">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}