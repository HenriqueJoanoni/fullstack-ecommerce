import React, {Component} from "react";
import Header from "./Header";
import PageFooter from "./PageFooter";
import {loggedUser} from "../images";

export default class ProfilePage extends Component {
    render() {
        return (
            <>
                <div className="app-container">
                    <div className="header-container">
                        <Header/>
                    </div>
                    <section className="profile-section">
                        <h1 className="profile-title">Profile Page</h1>
                        <div className="container">
                            <div className="card-profile-info">
                                <form>
                                    {/*{console.log(sessionStorage)}*/}
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={sessionStorage.firstName}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={sessionStorage.lastName}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={sessionStorage.email}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                placeholder="Phone number"
                                                value={sessionStorage.phone}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Update your password"
                                        />
                                    </div>

                                    <button type="submit">Save All</button>
                                </form>
                            </div>
                            <div className="card-profile-user">
                                <img className="profile-img" src={loggedUser} alt="User profile icon"/>
                                <div className="user-name">
                                    <span>{sessionStorage.name.toUpperCase()}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <PageFooter/>
                </div>
            </>
        )
    }
}