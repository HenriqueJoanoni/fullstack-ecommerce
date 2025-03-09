import React, { Component } from "react";
import { Link } from "react-router-dom";
import hamburger from "../images/hamburger.png";

export default class HeaderDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            positionLeft: false
        };
        this.dropdownRef = React.createRef();
    }

    toggleDropdown = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }), () => {
            if (this.state.isOpen) {
                this.adjustDropdownPosition();
            }
        });
    };

    adjustDropdownPosition = () => {
        if (this.dropdownRef.current) {
            const rect = this.dropdownRef.current.getBoundingClientRect();
            const isNearRightEdge = rect.right > window.innerWidth;
            this.setState({ positionLeft: isNearRightEdge });
        }
    };

    render() {
        const { isOpen, positionLeft } = this.state;

        return (
            <div className="links-menu">
                <div className="ham-icon-wrapper" onClick={this.toggleDropdown}>
                    <img className="hamburger-icon" src={hamburger} alt="Menu" />
                </div>

                <div ref={this.dropdownRef} className={`hamburg-dropdown ${isOpen ? "active" : ""}`}>
                    <ul>
                        <li><Link to="/">Discover</Link></li>
                        <li><Link to="/products">Instruments</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}
