import React, {Component} from 'react';
import axios from "axios"
import Header from "./Header";
import SearchTools from './SearchTools';
import ProductDisplayCard from './ProductDisplayCard';
import PageFooter from "./PageFooter";
import {SERVER_HOST} from "../config/global_constants"


export default class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedTags: [],
        selectedBrands: [],
        filterByNew: false,
      searchQuery: "",
      sortField: "name",
      sortDirection: 1
    };
  }

    determineSelectedProducts = () => {
        // console.log(this.state.selectedTags)
        let updatedSelectedProducts = [...this.state.products]
        //filter from search
        if (this.state.searchQuery !== "") {
            updatedSelectedProducts = updatedSelectedProducts.filter(
                product => product.product_name.toLowerCase().includes(this.state.searchQuery.toLowerCase()
                )
            )
        }

        //filter from tags
        //item tags
        if (this.state.selectedTags.length !== 0) {
            updatedSelectedProducts = updatedSelectedProducts.filter(
                product => product.product_tags.some(tag => this.state.selectedTags.includes(tag))
            )
        }

        //brand tags
        if (this.state.selectedBrands.length !== 0){
            updatedSelectedProducts = updatedSelectedProducts.filter(
                product => this.state.selectedBrands.includes(product.product_brand)
            )
        }

        //show new only?
        if (this.state.filterByNew){
            updatedSelectedProducts = updatedSelectedProducts.filter(product => product.is_new)
        }

        return updatedSelectedProducts
    }


    updateSearchQuery = e => {
        this.setState({searchQuery: e.target.value})
        this.determineSelectedProducts()
    }

    updateSort = val => {
        switch (val) {
            case "name_a_z":
                this.setState({sortField: "product_name", sortDirection: 1})
                break
            case "name_z_a":
                this.setState({sortField: "product_name", sortDirection: -1})
                break
            case "price_l_h":
                this.setState({sortField: "product_price", sortDirection: 1})
                break
            case "price_h_l":
                this.setState({sortField: "product_price", sortDirection: -1})
                break
            default:
                break;
        }
    }

    updateFilterByNew = val => {
        this.setState({filterByNew: val})
    }

    toggleTag = (tagName, tagSet) => {
        //brand tags
        if (tagSet === "productBrands"){
            if (!this.state.selectedBrands.includes(tagName)) {
                this.setState({selectedBrands: [...this.state.selectedBrands, tagName]})
            } else {
                let i = this.state.selectedBrands.indexOf(tagName)
                let newTagsList = [...this.state.selectedBrands]
                newTagsList.splice(i, 1)
                this.setState({selectedBrands: newTagsList})
            }
        }

        //product tags
        else {
            if (!this.state.selectedTags.includes(tagName)) {
                this.setState({selectedTags: [...this.state.selectedTags, tagName]})
            } else {
                let i = this.state.selectedTags.indexOf(tagName)
                let newTagsList = [...this.state.selectedTags]
                newTagsList.splice(i, 1)
                this.setState({selectedTags: newTagsList})
            }
        }

        console.log(this.state.selectedTags)
    }

    sortProducts = productsList => {
        return productsList.sort((a, b) =>
            a[this.state.sortField] > b[this.state.sortField] ? this.state.sortDirection : -this.state.sortDirection)
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/products`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        this.setState({products: res.data})
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


render() {
    return (
      <div id="productsPage">
        <Header />
        <div className="products-container">
          {/* ------filters column*/}
          <div className="filters-column">
            <div className="filters-section">
              <h3>Filter Results</h3>
                <SearchTools searchQuery={this.state.searchQuery}
                             updateSearchQuery={this.updateSearchQuery}
                             toggleTag={this.toggleTag}
                             updateSort={this.updateSort}
                             filterByNew={this.filterByNew}
                             updateFilterByNew={this.updateFilterByNew}
                />
            </div>
          </div>

          <div className="products-display">
            {/* ---------sort header*/}
            <div className="sort-header">
              <span>Showing {this.determineSelectedProducts().length} results</span>
              <select
                onChange={(e) => this.updateSort(e.target.value)}
                className="sort-dropdown"
              >
                <option value="name_a_z">Sort By: Name (A-Z)</option>
                <option value="name_z_a">Name (Z-A)</option>
                <option value="price_l_h">Price (Low to High)</option>
                <option value="price_h_l">Price (High to Low)</option>
              </select>
            </div>

            {/* ----------product cards*/}
            <div className="products-grid">
              {this.sortProducts(this.determineSelectedProducts()).map(product => (
                <ProductDisplayCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
        <PageFooter />
      </div>
    );
}
}
