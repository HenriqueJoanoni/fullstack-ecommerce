import {Component} from "react";


export default class LoginForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <form className="login-form">
                        <h2>Login to your account</h2>
                        <p className="welcome-text">Welcome! Please log in to continue.</p>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                            />
                        </div>
                        <button type="submit" className="btn-primary">Login</button>
                        <p className="register-link">
                            Not registered? <a href="/register">Create an account</a>
                        </p>
                        <p className="demo-info">
                            <strong>Demo User:</strong> <br/>
                            Email: user@example.com <br/>
                            Password: password12345
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}