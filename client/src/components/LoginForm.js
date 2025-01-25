import React, {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import {Link} from "react-router-dom";


export default class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const credentials = {
            email: this.state.email,
            password: this.state.password,
            redirect: localStorage.getItem("redirectTo") || "/",
        }

        console.log("Sending request to: ", `${SERVER_HOST}/login`, credentials)

        axios.post(`${SERVER_HOST}/login`, credentials)
            .then(res => {
                if (res.status === 200) {
                    console.log("Login success", res.data)

                    localStorage.setItem("authToken", res.data.token)
                    this.props.history.push(res.data.redirect)
                }
            }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <h2>Login to your account</h2>
                        <p className="welcome-text">Welcome! Please log in to continue.</p>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                onChange={this.handleChange}
                            />
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
        );
    }
}