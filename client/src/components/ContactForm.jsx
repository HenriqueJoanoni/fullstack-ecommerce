import React, {Component} from "react"
import Header from "./Header"
import Footer from "./PageFooter"
import {clockIcon, gpsIcon, phoneIcon} from "../images"

export default class ContactForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            message: "",
            status: null
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const {name, email, message, status} = this.state

        try {
            const response = await fetch("http://localhost:5000/send-email/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, email, message, status})
            })

            await response.json()

            if (response.ok) {
                this.setState({status: "Success", name: "", email: "", message: ""})
            } else {
                this.setState({status: "Error"})
            }
        } catch (error) {
            console.log("Error sending email", error)
            this.setState({status: "Error"})
        }
    }

    render() {

        const {name, email, message, status} = this.state

        return (
            <>
                <div className="app-container">
                    <div className="header-container">
                        <Header/>
                    </div>
                    <div className="page-container">Contact us</div>
                    <div className="background-banner"></div>
                    <div className="contact-section">
                        <div className="contact-form-card">
                            <div className="contact-form-card-row">
                                <div className="contact-info">
                                    <div className="contact-info-item">
                                        <img src={gpsIcon} alt="GPS Icon"/>
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
                                        <img src={phoneIcon} alt="Phone Icon"/>
                                        <div>
                                            <h3>Call Us</h3>
                                            <p>Tel: +353 42 937 0200</p>
                                        </div>
                                    </div>

                                    <div className="contact-info-item">
                                        <img src={clockIcon} alt="Clock Icon"/>
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
                                    {status === "success" && (
                                        <p style={{color: "green"}}>Email sent successfully!</p>
                                    )}
                                    {status === "error" && (
                                        <p style={{color: "red"}}>Failed to send email. Please try again.</p>
                                    )}
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label>Your Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Your Name"
                                                value={name}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Your Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Your Email"
                                                value={email}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Message *</label>
                                            <textarea
                                                name="message"
                                                placeholder="Message"
                                                rows="5"
                                                value={message}
                                                onChange={this.handleChange}
                                                required
                                            />
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