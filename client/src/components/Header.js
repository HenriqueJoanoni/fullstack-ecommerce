import React, {Component, createRef} from "react";
import guitarfootage from './guitarFootage.mp4';
import heartIcon from './hearticon.png';
import shoppingBagIcon from './shoppingbag.png';
import downArrowIcon from './down-arrow.png';
import guitarSample from './guitarsample.jpg';
import '../css/custom.css';
import '../scss/custom.scss';

export default class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
              searchQuery: '',
              isExpanded: false,
              isDropdownOpen: false,
        };
      this.searchInputRef = createRef();
      this.cardSectionRef = createRef();
      this.products = []
    }

    handleSearchChange = (e) => {
        this.setState({ searchQuery: e.target.value });
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
          this.setState({ isExpanded: false });
        }
      };
    
      handleLogoClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    
      toggleDropdown = () => {
        this.setState((prevState) => ({
          isDropdownOpen: !prevState.isDropdownOpen,
        }));
      };

      scrollToCardSection = () => {
        if (this.cardSectionRef.current) {
          this.cardSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      };
    
      componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
      }

    render(){
        return (
            <div className="header-container">
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
                            <img className="header-icon" src={heartIcon} alt="Heart" />
                          </div>
                          <div className="icon-wrapper">
                            <img
                              className="header-icon"
                              src={shoppingBagIcon}
                              alt="Shopping Bag"
                            />
                          </div>
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
        )
    }
}