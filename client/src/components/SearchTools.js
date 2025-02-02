import React, {Component} from "react";
import TagCheckBox from "./TagCheckBox"

export default class SearchTools extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: "default"
        }
        this.itemTags = ["acoustic", "electric", "bass", "electroacoustic", "accessory", "amplifier", "product", "strings", "picks", "new", "other"]
        this.productBrands = ["Gibson", "Fender", "Ernie Ball", "Ibanez", "D'addario", "Dunlop", "Marshall"]
    }

    updateSortField = e => {
        this.props.updateSort(e.target.value)
        this.setState({filter: e.target.value})
    }

    render() {
        return (
            <div className="container">
                <div id="searchToolsContainer" className="search-tools-container">
                    <div className="search-row">
                        <input
                            type="text"
                            value={this.props.searchQuery}
                            onChange={(e) => this.props.updateSearchQuery(e)}
                            placeholder="Search"
                            className="search-input"
                        />

                        <select
                            value={this.state.filter}
                            onChange={this.updateSortField}
                            className="sort-dropdown"
                        >
                            <option value="default">Sort By</option>
                            <option value="name_a_z">Name: A-Z</option>
                            <option value="name_z_a">Name: Z-A</option>
                            <option value="price_l_h">Price: Low - High</option>
                            <option value="price_h_l">Price: High - Low</option>
                        </select>
                    </div>

                    <div className="filter-container">
                        <h4 className="filter-title">Filter Results</h4>
                        <div className="filter-tags">
                            <div>
                                <p>Filter by Item</p>
                                {this.itemTags.map((tag) => (
                                    <TagCheckBox
                                        key={`${tag}_cb`}
                                        tagname={tag}
                                        name={tag}
                                        toggleTag={this.props.toggleTag}
                                        tagSet="itemTags"
                                    />
                                ))}
                            </div>
                            <div>
                            <p>Filter By Brand</p>
                                {this.productBrands.map(tag => (
                                    <TagCheckBox 
                                        key={`${tag}_cb`}
                                        tagname={tag}
                                        name={tag}
                                        toggleTag={this.props.toggleTag}
                                        tagSet="productBrands"
                                    />
                                ))}
                            </div>
                            <div>
                                <p>Sort By new Items: </p>
                                <input type="checkbox"
                                        value="Filter By New"
                                        checked={this.props.filterByNew}
                                        onClick={e=>{this.props.updateFilterByNew(e.target.checked)}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}