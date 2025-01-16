import React, {Component, createRef} from 'react';
import MainHeader from "./MainHeader";
import {guitarFootage, downArrowIcon, guitarSample} from '../images';
import '../css/custom.css';
import '../scss/custom.scss';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropdownOpen: false,
        }
        this.cardSectionRef = createRef();
    }

    toggleDropdown = () => {
        this.setState((prevState) => ({
            isDropdownOpen: !prevState.isDropdownOpen,
        }));
    };

    scrollToCardSection = () => {
        if (this.cardSectionRef.current) {
            this.cardSectionRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };

    render() {
        return (
            <div className="app-container">
                <div className="header-container">

                    {/** MAIN DARK HEADER */}
                    <MainHeader/>

                    <header className="second-header">
                        <div className="second-header-links">
                            <a href="#" onClick={this.toggleDropdown}>
                                New Arrivals{' '}
                                <img
                                    className="arrow-down-icon"
                                    src={downArrowIcon}
                                    alt="Arrow Down"
                                />
                            </a>
                            <a href="#">
                                Shop All{' '}
                                <img
                                    className="arrow-down-icon"
                                    src={downArrowIcon}
                                    alt="Arrow Down"
                                />
                            </a>
                            <a href="#">
                                Best Sellers{' '}
                                <img
                                    className="arrow-down-icon"
                                    src={downArrowIcon}
                                    alt="Arrow Down"
                                />
                            </a>
                            <a href="#">
                                Pages{' '}
                                <img
                                    className="arrow-down-icon"
                                    src={downArrowIcon}
                                    alt="Arrow Down"
                                />
                            </a>
                            <a href="#">
                                Sale{' '}
                                <img
                                    className="arrow-down-icon"
                                    src={downArrowIcon}
                                    alt="Arrow Down"
                                />
                            </a>
                        </div>
                    </header>

                    {this.state.isDropdownOpen && (
                        <div className="dropdown-menu">
                            <div className="first-dropdown">
                                <div className="dd-header-links">
                                    <a className="newarrivalstxt" href="#">
                                        New Arrivals: Hottest Deals
                                    </a>
                                </div>
                            </div>
                            <div className="second-dropdown">
                                <div className="dd2-header-links">
                                    <a href="#">New Arrivals Option 4</a>
                                    <a href="#">New Arrivals Option 5</a>
                                    <a href="#">New Arrivals Option 6</a>
                                    <a href="#">More Options</a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <section className="fullscreen-video">
                    <div className="video-container">
                        <video autoPlay loop muted>
                            <source src={guitarFootage} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>

                        <div className="video-overlay">
                            <div className="overlay-text">
                                <p className="exclusive-text">EXCLUSIVE</p>
                                <h1>NEW SPRING</h1>
                                <h1>COLLECTION</h1>
                                <button
                                    className="discover-button"
                                    onClick={this.scrollToCardSection}
                                >
                                    Discover What's New
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <p>Transform your playstyle.</p>
                    <h1>LATEST DEALS</h1>
                </section>

                <section className="card-section" ref={this.cardSectionRef}>
                    <div className="card-container">
                        <div className="card">
                            <div className="card-image">
                                <img src={guitarSample} alt="Guitar Sample"/>
                            </div>
                            <div className="card-content">
                                <h2>Guitar 1</h2>
                                <p>Great guitar for beginners!</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-image">
                                <img src={guitarSample} alt="Guitar Sample"/>
                            </div>
                            <div className="card-content">
                                <h2>Guitar 2</h2>
                                <p>Perfect for intermediate players!</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-image">
                                <img src={guitarSample} alt="Guitar Sample"/>
                            </div>
                            <div className="card-content">
                                <h2>Guitar 3</h2>
                                <p>Wow</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-image">
                                <img src={guitarSample} alt="Guitar Sample"/>
                            </div>
                            <div className="card-content">
                                <h2>Guitar 4</h2>
                                <p>Great! Guys idk what to write</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-image">
                                <img src={guitarSample} alt="Guitar Sample"/>
                            </div>
                            <div className="card-content">
                                <h2>Guitar 5</h2>
                                <p>Affordable!</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-image">
                                <img src={guitarSample} alt="Guitar Sample"/>
                            </div>
                            <div className="card-content">
                                <h2>Guitar 6</h2>
                                <p>Professional!</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-image">
                                <img src={guitarSample} alt="Guitar Sample"/>
                            </div>
                            <div className="card-content">
                                <h2>Guitar 7</h2>
                                <p>Great!</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-image">
                                <img src={guitarSample} alt="Guitar Sample"/>
                            </div>
                            <div className="card-content">
                                <h2>Guitar 8</h2>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
