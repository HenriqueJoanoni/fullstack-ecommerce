import React, {Component} from 'react'
import axios from "axios"
import Header from "./Header"
import SearchTools from './SearchTools'
import ProductDisplayCard from './ProductDisplayCard'
import PageFooter from "./PageFooter"
import {SERVER_HOST} from "../config/global_constants"

export default class ProductsPage extends Component {
    constructor(props) {
        super(props);



        this.state = {
            products: [],
            selectedTags: [],
            selectedBrands: [],
            searchQuery: "",
            filterByNew: false,
            sortField: "product_name",
            sortDirection: 1
        }
    }

    determineSelectedProducts = () => {
        console.log(this.state.products)
        let updatedSelectedProducts = [...this.state.products]

        if (this.state.searchQuery) {
            updatedSelectedProducts = updatedSelectedProducts.filter(product =>
                product.product_name?.toLowerCase().includes(this.state.searchQuery.toLowerCase())
            )
        }

        if (this.state.selectedTags.length > 0) {
            updatedSelectedProducts = updatedSelectedProducts.filter(product =>
                product.product_tags?.some(tag => this.state.selectedTags.includes(tag))
            )
        }

        if (this.state.selectedBrands.length > 0) {
            updatedSelectedProducts = updatedSelectedProducts.filter(product =>
                product.product_brand?.toLowerCase() &&
                this.state.selectedBrands.includes(product.product_brand.toLowerCase())
            )
        }

        if (this.state.filterByNew) {
            updatedSelectedProducts = updatedSelectedProducts.filter(product =>
                product.is_new === true
            )
        }

        return updatedSelectedProducts
    }

    updateSearchQuery = e => {
        this.setState({searchQuery: e.target.value})
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
                break
        }
    }

    updateFilterByNew = val => {
        this.setState({filterByNew: val})
    }

    toggleTag = (tagName, tagSet) => {
        if (tagSet === "productBrands") {
            const normalizedBrand = tagName.toLowerCase()
            this.setState(prevState => ({
                selectedBrands: prevState.selectedBrands.includes(normalizedBrand)
                    ? prevState.selectedBrands.filter(b => b !== normalizedBrand)
                    : [...prevState.selectedBrands, normalizedBrand]
            }))
        } else {
            this.setState(prevState => ({
                selectedTags: prevState.selectedTags.includes(tagName)
                    ? prevState.selectedTags.filter(t => t !== tagName)
                    : [...prevState.selectedTags, tagName]
            }))
        }
    }

    sortProducts = productsList => {
        return productsList.sort((a, b) => {
            const aValue = a[this.state.sortField]
            const bValue = b[this.state.sortField]

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return this.state.sortDirection * aValue.localeCompare(bValue)
            }
            return this.state.sortDirection * (aValue - bValue)
        })
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/products`)
            .then(res => {
                if (res.data) {
                    const safeProducts = res.data.map(product => ({
                        tags: [],
                        product_brand: product.product_brand?.toLowerCase() || '',
                        is_new: false,
                        ...product
                    }))
                    this.setState({products: safeProducts})
                }
            })
            .catch(err => {
                console.log("Error loading products:", err)
            })
    }

    render() {
        const filteredProducts = this.determineSelectedProducts()
        const sortedProducts = this.sortProducts(filteredProducts)

        return (
            <div id="productsPage">
                <Header/>
                <div className="products-container">
                    {/* ------filters column*/}
                    <div className="filters-column">
                        <div className="filters-section">
                            <h3>Filter Results</h3>
                            <SearchTools
                                searchQuery={this.state.searchQuery}
                                updateSearchQuery={this.updateSearchQuery}
                                toggleTag={this.toggleTag}
                                updateSort={this.updateSort}
                                filterByNew={this.state.filterByNew}
                                updateFilterByNew={this.updateFilterByNew}
                            />
                        </div>
                    </div>

                    <div className="products-display">
                        {/* ---------sort header*/}
                        <div className="sort-header">
                            <span>Showing {filteredProducts.length} results</span>
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
                            {sortedProducts.map(product => (
                                <ProductDisplayCard key={product._id} product={product}/>
                            ))}
                        </div>
                    </div>
                </div>
                <PageFooter/>
            </div>
        )
    }
}