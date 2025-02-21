import React, {Component, createRef} from "react"
import {Link, NavLink, withRouter} from "react-router-dom"
import {heartIcon, shoppingBagIcon, downArrowIcon} from '../images'
import UserAvatarDropdown from "./UserAvatarDropdown"
import axios from "axios"
import {ACCESS_GUEST_LEVEL, SERVER_HOST} from "../config/global_constants"

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchQuery: '',
            isExpanded: false,
            isDropdownOpen: false,
        }
        this.searchInputRef = createRef()
        this.cardSectionRef = createRef()
        this.products = []
    }

    handleSearchChange = (e) => {
        this.setState({searchQuery: e.target.value})
    }

    toggleSearch = () => {
        this.setState((prevState) => ({
            isExpanded: !prevState.isExpanded,
        }))
    }

    handleClickOutside = (event) => {
        if (
            this.searchInputRef.current &&
            !this.searchInputRef.current.contains(event.target)
        ) {
            this.setState({isExpanded: false})
        }
    }

    handleLogoClick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
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

    handleUserFavorites = async () => {
        const token = sessionStorage.getItem("authToken")
        if (!token) {
            console.error("No auth token found")
            return
        }

        try {
            const response = await axios.get(
                `${SERVER_HOST}/favorites/${sessionStorage.getItem("email")}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )

            if (response.status === 200) {
                this.props.history.push({
                    pathname: "/favorites",
                    state: { userFavorites: response.data.favorites }
                })
                this.setState({ errors: {} })
            }

        } catch (error) {
            console.error("Error fetching favorites:", error)
            this.setState({ error: "Failed to fetch favorites" })
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/new-products`)
            .then(res => {
                if (res.data) {
                    // console.log(res.data)

                    const newProducts = res.data.map(product => ({
                        ...product,
                    }))
                    this.setState({products: newProducts})
                }
            })
            .catch(err => {
                console.log("error", err)
            })
        document.addEventListener('click', this.handleClickOutside)
    }

    render() {
        const isLoggedIn = sessionStorage.accessLevel > ACCESS_GUEST_LEVEL
        return (
            <div className="header-container">
                <header className="first-header">
                    <div className="header-links-container">
                        <NavLink exact to="/" activeClassName="active">Discover</NavLink>
                        <NavLink to="/products" activeClassName="active">Instruments</NavLink>
                        <NavLink to="/contact" activeClassName="active">Contact</NavLink>
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
                        {isLoggedIn && (
                            <div className="icon-wrapper">
                                <a onClick={this.handleUserFavorites}>
                                    <img className="header-icon" src={heartIcon} alt="Heart"/>
                                </a>
                            </div>
                        )}
                        <div className="icon-wrapper">
                            <Link to="/cart">
                                <img
                                    className="header-icon"
                                    src={shoppingBagIcon}
                                    alt="Shopping Bag"
                                />
                            </Link>
                        </div>
                        <UserAvatarDropdown logged={isLoggedIn}/>
                    </div>
                </header>

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
                        <Link to="/products">
                            Shop All
                        </Link>
                        <a href="#">
                            Best Sellers
                        </a>
                        <a href="#">
                            Pages
                        </a>
                        <a href="#">
                            Sale
                        </a>
                    </div>
                </header>

                {this.state.isDropdownOpen && (
                    <div className="dropdown-menu">
                        <div className="second-dropdown">
                            <div className="dd2-header-links">
                                {this.state.products.map(product => (
                                    <a href="#">{product.product_name}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(Header)