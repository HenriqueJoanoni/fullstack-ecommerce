import React, {Component} from "react";
import TagCheckBox from "./TagCheckBox"
import {upload, downArrowIcon} from "../images"

export default class SearchTools extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: "default",
            expandedSections: {
                itemTypes: false,
                brands: false,
                newItems: false
            }
        };
        this.itemTags = ["Acoustic", "Electric", "Bass", "Electroacoustic", "Accessory", "Amplifier", "Product", "Strings", "Picks",  "Other"];
        this.productBrands = ["Gibson", "Fender", "Ernie Ball", "Ibanez", "D'addario", "Dunlop", "Marshall"];
    }

    toggleSection = (section) => {
        this.setState(prevState => ({
            expandedSections: {
                ...prevState.expandedSections,
                [section]: !prevState.expandedSections[section]
            }
        }))
    }

    handleBrandToggle = (brandName) => {
        const normalizedBrand = brandName.toLowerCase()
        this.props.toggleTag(normalizedBrand, "productBrands")
    }

    renderBrandFilters() {
        return this.productBrands.map((brand) => (
            <TagCheckBox
                key={`${brand}_cb`}
                tagname={brand.toLowerCase()}
                name={brand}
                toggleTag={this.handleBrandToggle}
                tagSet="productBrands"
            />
        ))
    }

    render() {
        return (
            <div className="search-tools-wrapper">
                <div className="search-sort-row">
                    <input
                        type="text"
                        value={this.props.searchQuery}
                        onChange={(e) => this.props.updateSearchQuery(e)}
                        placeholder="Search products..."
                        className="filter-search-input"
                    />
                </div>

                <div className="filter-section">
                    <div className="filter-tags-grid">
                        <div className="filter-group">
                            <h4 onClick={() => this.toggleSection('itemTypes')}>
                                Item Types
                                <span className="arrow">
                                    {this.state.expandedSections.itemTypes ? (
                                        <img className="arrow-down-icon" src={upload} alt="Collapse"/>
                                    ) : (
                                        <img className="arrow-down-icon" src={downArrowIcon} alt="Expand"/>
                                    )}
                                </span>
                            </h4>
                            {this.state.expandedSections.itemTypes &&
                                this.itemTags.map((tag) => (
                                    <TagCheckBox
                                        key={`${tag}_cb`}
                                        tagname={tag}
                                        name={tag}
                                        toggleTag={(tag) => this.props.toggleTag(tag, "itemTags")}
                                    />
                                ))
                            }
                        </div>
                        <div className="filter-group">
                            <h4 onClick={() => this.toggleSection('brands')}>
                                Brands
                                <span className="arrow">
                                    {this.state.expandedSections.brands ? (
                                        <img className="arrow-down-icon" src={upload} alt="Collapse"/>
                                    ) : (
                                        <img className="arrow-down-icon" src={downArrowIcon} alt="Expand"/>
                                    )}
                                </span>
                            </h4>
                            {this.state.expandedSections.brands && this.renderBrandFilters()}
                        </div>

                        <div className="filter-group">
                            <h4 onClick={() => this.toggleSection('newItems')}>
                                New Items
                                <span className="arrow">
                                    {this.state.expandedSections.newItems ? (
                                        <img className="arrow-down-icon" src={upload} alt="Collapse"/>
                                    ) : (
                                        <img className="arrow-down-icon" src={downArrowIcon} alt="Expand"/>
                                    )}
                                </span>
                            </h4>
                            {this.state.expandedSections.newItems && (
                                <div className="tagCheckBox">
                                    <input
                                        type="checkbox"
                                        id="newArrivalsCheckbox"
                                        checked={this.props.filterByNew}
                                        onChange={e => this.props.updateFilterByNew(e.target.checked)}
                                    />
                                    <label htmlFor="newArrivalsCheckbox">
                                        New Arrivals Only
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}