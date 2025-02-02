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
            <div className="search-tools-wrapper">
                <div className="search-sort-row">
                    <input
                        type="text"
                        value={this.props.searchQuery}
                        onChange={(e) => this.props.updateSearchQuery(e)}
                        placeholder="Search products..."
                        className="filter-search-input"
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

                <div className="filter-section">
                    <h3 className="filter-header">Filter by Category</h3>
                    <div className="filter-tags-grid">
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
        );
    }
}