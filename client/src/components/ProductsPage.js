import React, { Component } from 'react';
import axios from "axios"
import Header from "./Header";
import SearchTools from './SearchTools';
import ProductDisplayCard from './ProductDisplayCard';
import { SERVER_HOST } from "../config/global_constants"


export default class ProductsPage extends Component {
    constructor(props){
        super(props);
        /*
        this.products = [
            {
                id: 1,
                name: "first acoustic",
                description: "this is a description",
                price: 2500,
                mainImage: "./guitarsample.jpg",
                photos: ["./guitarsample.jpg"],
                tags: ["acoustic"]
            },
            {
                id: 2,
                name: "second electric",
                description: "and this is another description",
                price: 1700,
                mainImage: "./guitarsample.jpg",
                photos: ["./guitarsample.jpg"],
                tags: ["electric"]
            },
            {
                id: 3,
                name: "third bass",
                description: "third this is a description",
                price: 1200,
                mainImage: "./guitarsample.jpg",
                photos: ["./guitarsample.jpg"],
                tags: ["bass"]
            },
            {
                id: 4,
                name: "fourth electroacoustic guitar1",
                description: "fourth this is yet another description",
                price: 2100,
                mainImage: "./guitarsample.jpg",
                photos: ["./guitarsample.jpg"],
                tags: ["electroacoustic"]
            }
        ]

    */


        this.state = {
            products: [],
            selectedTags: [],
            searchQuery: "",
            sortField: "name",
            sortDirection: 1
        }        
    }

    determineSelectedProducts = () => {
        //console.log(this.state.selectedTags)
        let updatedSelectedProducts = [...this.state.products]
        //filter from search
        if (this.state.searchQuery !== ""){
            updatedSelectedProducts = updatedSelectedProducts.filter(product => product.product_name.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
        }

        //filter from tags
        if (this.state.selectedTags.length !== 0){
            updatedSelectedProducts = updatedSelectedProducts.filter(product => product.tags.some(tag => this.state.selectedTags.includes(tag)))
        }
        

        return updatedSelectedProducts
    }


    updateSearchQuery = e => {
        this.setState({searchQuery: e.target.value})
        this.determineSelectedProducts()
    }

    updateSort = val => {
        switch (val){
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

        }
    }

    toggleTag = tagName => {
        if (!this.state.selectedTags.includes(tagName)){
            this.setState({selectedTags: [...this.state.selectedTags, tagName ]})
        } else {
            let i = this.state.selectedTags.indexOf(tagName)
            let newTagsList = [...this.state.selectedTags]
            newTagsList.splice(i, 1)
            this.setState({selectedTags: newTagsList})
        }
        console.log(this.state.selectedTags)
    }

    sortProducts = productsList => {
        return productsList.sort((a, b) => a[this.state.sortField] > b[this.state.sortField] ? this.state.sortDirection : -this.state.sortDirection)
    }

    componentDidMount(){
        axios.get(`${SERVER_HOST}/products`)
        .then(res => {
            if (res.data){
                if (res.data.errorMessage){
                    console.log(res.data.errorMessage)
                } else {
                    this.setState({products: res.data})
                }
            }
        })
        .catch(err => {console.log(err)})
    }


    render (){
        return (
            <>
                <Header />
                <SearchTools searchQuery={this.state.searchQuery} 
                            updateSearchQuery={this.updateSearchQuery} 
                            toggleTag={this.toggleTag}
                            updateSort={this.updateSort}
                />
                <div id="productsDisplayPanel">
                    {this.sortProducts(this.determineSelectedProducts()).map(product => <ProductDisplayCard key={product._id} product={product}/>)}
                </div>  
            </>
            
        )
    }
}
