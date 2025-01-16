import React, {Component, createRef} from 'react';
import {heartIcon, shoppingBagIcon, userIcon} from '../images';
import {Navigate} from "react-router-dom";

export default class MainHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            isExpanded: false,
        };
        this.searchInputRef = createRef();
    }

    handleSearchChange = (e) => {
        this.setState({searchQuery: e.target.value});
    };

    toggleSearch = () => {
        this.setState((prevState) => ({
            isExpanded: !prevState.isExpanded,
        }));
    };

    handleClickOutside = (event) => {
        if (
            this.searchInputRef.current &&
            !this.searchInputRef.current.contains(event.target)
        ) {
            this.setState({isExpanded: false});
        }
    };

    handleLogoClick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    render() {
        return (
            <div>
                <header className="first-header">
                    <div className="header-links-container">
                        <a href="#home" className="active">Discover</a>
                        <a href="#instruments">Instruments</a>
                        <a href="#brands">Brands</a>
                        <a href="#contact">Contact</a>
                    </div>

                    <div id="firestrings-logo" onClick={this.handleLogoClick}>
                        FireStrings
                    </div>

                    <div className="search-container" ref={this.searchInputRef}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={this.state.searchQuery}
                            onChange={this.handleSearchChange}
                            onClick={this.toggleSearch}
                            className={`search-input ${
                                this.state.isExpanded ? 'expanded' : ''
                            }`}
                        />
                    </div>

                    <div className="icon-container">
                        <div className="icon-wrapper">
                            <img
                                className="header-icon"
                                src={heartIcon}
                                alt="Heart"
                            />
                        </div>
                        <div className="icon-wrapper">
                            <img
                                className="header-icon"
                                src={shoppingBagIcon}
                                alt="Shopping Bag"
                            />
                        </div>
                        <div className="icon-wrapper">
                            <img
                                className="header-icon"
                                src={userIcon}
                                alt="Profile-login"
                            />
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}
