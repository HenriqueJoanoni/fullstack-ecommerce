import {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";


export default class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
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
            firstName: this.state.first_name,
            lastName: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            redirect: localStorage.getItem("redirectTo") || "/login"
        }

        axios.post(`${SERVER_HOST}/register`, credentials)
            .then(res => {
                if (res.status === 201) {
                    console.log("Register success", res.data)

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
                        <h2>Register</h2>
                        <p className="welcome-text">Please, create your account.</p>
                        <div className="form-group">
                            <label htmlFor="first_name" className="form-label">First Name:</label>
                            <input
                                type="first_name"
                                className="form-control"
                                id="first_name"
                                name="first_name"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="first_name" className="form-label">Last Name:</label>
                            <input
                                type="last_name"
                                className="form-control"
                                id="last_name"
                                name="last_name"
                                onChange={this.handleChange}
                            />
                        </div>
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
                        <div className="form-group">
                            <label htmlFor="confirm_password" className="form-label">Confirm Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirm_password"
                                name="confirm_password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                        <div>
                            <a href="/login" className="btn btn-secondary">Cancel</a>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}