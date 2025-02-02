import React, {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";


export default class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirm_password: "",
            errors: {},
            isLoading: false,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            errors: {...this.errors, [e.target.name]: ""},
        })
    }

    validateForm = () => {
        const errors = {}
        const {firstName, lastName, email, password, confirm_password} = this.state
        let validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        console.log({
            "first name": firstName,
            "last name": lastName,
        })

        if (!firstName.trim()) {
            errors.firstName = "First name is required"
        }

        if (!lastName.trim()) {
            errors.lastName = "Last name is required"
        }

        if (!email.trim()) {
            errors.email = "Email is required"
        }

        if (email.trim() && !email.match(validateEmail)) {
            errors.email = "Please, enter a valid email address"
        }

        if (!password.trim()) {
            errors.password = "Password is required"
        }

        if (password.length < 6) {
            errors.password = "Password must be at least 6 characters"
        }

        if (!confirm_password.trim()) {
            errors.confirm_password = "Confirm password is required"
        }

        if (password !== password) {
            errors.confirm_password = "Passwords do not match"
        }

        return errors
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const errors = this.validateForm()
        if (Object.keys(errors).length > 0) {
            this.setState({errors})

            setTimeout(() => {
                this.setState({ errors: {} });
            }, 5000);

            return
        }

        this.setState({isLoading: true})

        const credentials = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            confirm_password: this.state.confirm_password,
            redirect: localStorage.getItem("redirectTo") || "/login",
        }

        try {
            const res = await axios.post(`${SERVER_HOST}/register`, credentials)
            if (res.status === 201) {
                localStorage.setItem("authToken", res.data.token)
                this.props.history.push(res.data.redirect)
            }
        } catch (error) {
            if (error.response?.data?.error) {
                this.setState({errors: {form: error.response.data.error}})
            } else {
                this.setState({errors: {form: "An unexpected error occurred."}})
            }
        } finally {
            this.setState({isLoading: false})
        }
    }

    render() {
        const {errors, isLoading} = this.state

        return (
            <div className="login-background">
                <div className="login-container">
                    <form className="login-form" onSubmit={this.handleSubmit} noValidate>
                        <h2>Register</h2>
                        <p className="welcome-text">Please, create your account.</p>

                        {errors.form && <div className="alert alert-error">{errors.form}</div>}

                        <div className="form-group">
                            <label htmlFor="firstName" className="form-label">First Name:</label>
                            <input
                                type="text"
                                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                id="firstName"
                                name="firstName"
                                onChange={this.handleChange}
                            />
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName" className="form-label">Last Name:</label>
                            <input
                                type="text"
                                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                id="lastName"
                                name="lastName"
                                onChange={this.handleChange}
                            />
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address:</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={this.handleChange}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                onChange={this.handleChange}
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm_password" className="form-label">Confirm Password:</label>
                            <input
                                type="password"
                                className={`form-control ${errors.confirm_password ? "is-invalid" : ""}`}
                                id="confirm_password"
                                name="confirm_password"
                                onChange={this.handleChange}
                            />
                            {errors.confirm_password &&
                                <div className="invalid-feedback">{errors.confirm_password}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {isLoading ? "Registering..." : "Register"}
                        </button>
                        <div>
                            <a href="/login" className="btn btn-secondary">Cancel</a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}