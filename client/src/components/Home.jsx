import React, {Component, createRef} from 'react'
import {guitarFootage} from '../images'
import '../css/custom.css'
import '../scss/custom.scss'
import Header from "./Header"
import PageFooter from "./PageFooter"
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import ProductDisplayCard from "./ProductDisplayCard";

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDropdownOpen: false,
            products: [],
        }
        this.cardSectionRef = createRef()
    }

    toggleDropdown = () => {
        this.setState((prevState) => ({
            isDropdownOpen: !prevState.isDropdownOpen,
        }))
    }

    scrollToCardSection = () => {
        if (this.cardSectionRef.current) {
            this.cardSectionRef.current.scrollIntoView({behavior: 'smooth'})
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/deal-products`)
            .then(res => {
                if (res.data) {
                    // console.log(res.data)

                    const dealProducts = res.data.map(product => ({
                        ...product,
                    }))
                    this.setState({products: dealProducts})
                }
            })
            .catch(err => {
                console.log("error", err)
            })
    }

    render() {
        return (
            <>
                <div className="app-container">
                    <div className="header-container">
                        <Header/>
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

                    <div className="card-section" ref={this.cardSectionRef}>
                        <div className="products-grid">
                            {this.state.products.map(product => (
                                <ProductDisplayCard key={product._id} product={product}/>
                            ))}
                            </div>
                        </div>
                    <PageFooter/>
                </div>
            </>
        )
    }
}
