import React, {Component} from "react"
import {Link} from "react-router-dom"
import {userIcon, loggedUser} from '../images'
import {ACCESS_NORMAL_USER_LEVEL} from "../config/global_constants"
import { ACCESS_GUEST_LEVEL } from "../config/global_constants"

export default class UserAvatarDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            positionLeft: false
        }
        this.dropdownRef = React.createRef()
    }

    toggleDropdown = () => {
        this.setState(
            prevState => ({
                isOpen: !prevState.isOpen
            }),
            () => {
                if (this.state.isOpen) {
                    this.adjustDropdownPosition()
                }
            }
        )
    }

    adjustDropdownPosition = () => {
        if (this.dropdownRef.current) {
            const rect = this.dropdownRef.current.getBoundingClientRect()
            const isNearRightEdge = rect.right > window.innerWidth

            this.setState({positionLeft: isNearRightEdge})
        }
    }

    handleLogout = () => {
        sessionStorage.clear()
        localStorage.clear()
        window.location.reload()
        window.location.href="/"
    }

    render() {
        const {isOpen, positionLeft} = this.state
        const isLoggedIn = sessionStorage.accessLevel > ACCESS_GUEST_LEVEL
        const isAdmin = sessionStorage.accessLevel > ACCESS_NORMAL_USER_LEVEL

        return (
            <div className="profile-menu">
                <div className="icon-wrapper" onClick={this.toggleDropdown}>
                    {isLoggedIn ? (
                        <img className="header-icon" id="headerProfileImg" src={localStorage.profilePhoto} alt=""/>
                    ) : (
                        <Link to="/login">
                            <img className="header-icon" src={userIcon} alt="Default profile icon"/>
                        </Link>
                    )}
                </div>

                {this.props.logged && (
                    <div
                        ref={this.dropdownRef}
                        className={`dropdown-menu ${isOpen ? "open" : ""}`}
                        style={{
                            right: positionLeft ? "auto" : "0",
                            left: positionLeft ? "0" : "auto"
                        }}
                    >
                        <ul>
                            <li><Link to="/profile">Profile</Link></li>
                            {isAdmin && (
                                <li>
                                    <Link to="/admin">Admin Page</Link>
                                </li>
                            )}
                            <li onClick={this.handleLogout}>
                                <span className="logoutspan">Logout</span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        )
    }
}