import React, {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import {Link} from "react-router-dom";


export default class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            errors: {}
        }
    }

    handleChange = (e) => {
        this.setState((prevState) => ({
            [e.target.name]: e.target.value,
            errors: {...prevState.errors, [e.target.name]: ""},
        }))
    }

    validateForm = () => {
        const errors = {}
        const {email, password} = this.state
        let validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email) {
            errors.email = "Email is required"
        }

        if (email.trim() && !email.match(validateEmail)) {
            errors.email = "Please, enter a valid email address"
        }

        if (!password) {
            errors.password = "Password is required"
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

        const credentials = {
            email: this.state.email,
            password: this.state.password,
            redirect: localStorage.getItem("redirectTo") || "/",
        }

        console.log("Sending request to: ", `${SERVER_HOST}/login`, credentials)
        try {
            const res = await axios.post(`${SERVER_HOST}/login`, credentials)
            if (res.status === 200) {
                localStorage.setItem("authToken", res.data.token)
                this.props.history.push(res.data.redirect)
            }
        } catch (error) {
            if (error.response?.data?.error) {
                this.setState({errors: {form: error.response.data.error}})
            } else {
                this.setState({errors: {form: "An unexpected error occurred. Please try again"}})
            }
        }
    }

    render() {
        const {errors} = this.state

        return (
            <div className="login-background">
                <div className="login-container">
                    <form className="login-form" onSubmit={this.handleSubmit} noValidate>
                        <h2>Login to your account</h2>
                        <p className="welcome-text">Welcome! Please log in to continue.</p>

                        {errors.form && <div className="alert alert-error">{errors.form}</div>}

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
                        <button type="submit" className="btn btn-primary">Login</button>
                        <Link to="/register">
                            <p className="register-link">
                                Not registered? <a>Create an account</a>
                            </p>
                        </Link>
                        <p className="demo-info">
                            <strong>Demo User:</strong> <br/>
                            Email: test@test.com <br/>
                            Password: randomPassword
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}