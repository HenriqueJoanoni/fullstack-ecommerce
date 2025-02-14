import React, {Component} from "react"
import Header from "./Header"
import PageFooter from "./PageFooter"
import {loggedUser} from "../images"
import {SERVER_HOST} from "../config/global_constants"
import axios from "axios"

export default class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: sessionStorage.getItem("firstName") || "",
            lastName: sessionStorage.getItem("lastName") || "",
            email: sessionStorage.getItem("email") || "",
            phone: sessionStorage.getItem("phone") || "",
            password: "",
            errors: {},
            showToast: false,
            message: "",
            type: "",
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target

        if (name === "phone") {
            const numericValue = value.replace(/\D/g, "")
            if (numericValue.length <= 10) {
                this.setState((prevState) => ({
                    [name]: numericValue,
                    errors: {...prevState.errors, [name]: ""},
                }))
            }
        } else {
            this.setState((prevState) => ({
                [name]: value,
                errors: {...prevState.errors, [name]: ""},
            }))
        }
    }

    validateForm = () => {
        const errors = {}
        const {firstName, lastName, email, phone} = this.state
        let validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        let phonePattern = /^0[1-9]\d{8}$/

        if (!firstName) {
            errors.firstName = "First name is required"
        }

        if (!lastName) {
            errors.lastName = "Last name is required"
        }

        if (phone && !phone.match(phonePattern)) {
            errors.phone = "Invalid phone number"
        }

        if (!email || (typeof email === "string" && email.trim() && !email.match(validateEmail))) {
            errors.email = "Please, enter a valid email address"
        }

        return errors
    }

    showToast = (message, type) => {
        this.setState({showToast: true, message, type})

        setTimeout(() => {
            this.setState({showToast: false})
        }, 3000)
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const errors = this.validateForm()
        if (Object.keys(errors).length > 0) {
            this.setState({errors})
            if (Object.keys(errors).length === 1) {
                this.showToast(`❌ ${Object.values(errors)[0]}`, "error")
            } else {
                this.showToast("❌ Something went wrong", "error")
            }
            return
        }

        const userInfo = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            password: (this.state.password === "") ? sessionStorage.getItem("password") : this.state.password,
        }

        try {
            const res = await axios.post(`${SERVER_HOST}/profile-update`,
                userInfo,
                {
                    headers:
                        {Authorization: `Bearer ${sessionStorage.getItem("authToken")}`}
                })

            if (res.status === 200) {
                // console.log(res.data)
                this.showToast("🎉 Success! Profile updated", "success")

                /** UPDATE SESSION WITH THE LAST UPDATED INFO FROM THE USER COLLECTION AFTER PROFILE CHANGE */
                const updatedUser = res.data.updatedUserData
                sessionStorage.setItem("firstName", updatedUser.first_name)
                sessionStorage.setItem("lastName", updatedUser.last_name)
                sessionStorage.setItem("email", updatedUser.user_email)
                sessionStorage.setItem("phone", updatedUser.user_phone)
                this.setState({errors: {}})
            }
        } catch (error) {
            if (error.response?.data?.error) {
                this.showToast(`❌ ${error.response.data.error}`, "error")
            } else {
                this.showToast("❌ Profile could not be updated", "error")
            }
        }
    }

    render() {
        const {showToast, message, type, errors} = this.state
        return (
            <div className="app-container">
                <div className="header-container">
                    <Header/>
                </div>
                <section className="profile-section">
                    <h1 className="profile-title">Profile Page</h1>

                    {showToast && (
                        <div className={`toast ${type}`}>
                            {message}
                        </div>
                    )}

                    <div className="container">
                        <div className="card-profile-info">
                            <form onSubmit={this.handleSubmit} noValidate>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                            value={this.state.firstName}
                                            onChange={this.handleChange}
                                        />
                                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                            value={this.state.lastName}
                                            onChange={this.handleChange}
                                        />
                                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="Phone number"
                                            value={this.state.phone}
                                            onChange={this.handleChange}
                                            maxLength="10"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Update your password"
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <button type="submit">Save All</button>
                            </form>
                        </div>

                        <div className="card-profile-user">
                            <img
                                className="profile-img"
                                src={loggedUser}
                                alt="User profile icon"
                            />
                            <div className="user-name">
                                <span>{this.state.firstName.toUpperCase()}</span>
                            </div>
                        </div>
                    </div>
                </section>
                <PageFooter/>
            </div>
        )
    }
}