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
            errors: {}
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()

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

                /** UPDATE SESSION WITH THE LAST UPDATED INFO FROM THE USER AFTER PROFILE CHANGE */
                const updatedUser = res.data.updatedUserData
                sessionStorage.setItem("firstName", updatedUser.first_name)
                sessionStorage.setItem("lastName", updatedUser.last_name)
                sessionStorage.setItem("email", updatedUser.user_email)
                sessionStorage.setItem("phone", updatedUser.user_phone)
            }
        } catch (error) {
            if (error) {
                this.setState({errors: error.response.data.errors})
            } else {
                this.setState({errors: "Profile could not be updated"})
            }
        }
    }

    render() {
        return (
            <div className="app-container">
                <div className="header-container">
                    <Header/>
                </div>
                <section className="profile-section">
                    <h1 className="profile-title">Profile Page</h1>
                    <div className="container">
                        <div className="card-profile-info">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={this.state.firstName}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={this.state.lastName}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="Phone number"
                                            value={this.state.phone}
                                            onChange={this.handleChange}
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