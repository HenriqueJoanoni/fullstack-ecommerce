import react, { Component} from "react"
import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"
import AdminSearchResult from "./AdminSearchResult"


export default class AdminPanelProducts extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchQuery: "",
            allProducts: [],
            editingID: null,
            editingMode: false
        }
    }

    updateSearchQuery = newVal => {
        this.setState({searchQuery: newVal})
    }

    setEditingState = (id, editing) => {
        if (!editing){
            this.setState({editingID: null, editing: false})
        } else {
            this.setState({editingID: id, editing: true})
        }
    }

    determineSelectedProducts = () => {
        //compare against both name and SKU 
        let regex = new RegExp(`${this.state.searchQuery}`, "i") 
        return [...this.state.allProducts].filter(product => 
            regex.test(product.product_name) || regex.test(product.product_sku)
        )
    }

    componentDidMount(){
        axios.get(`${SERVER_HOST}/products`)
        .then(res => {
            if (res.data){
                this.setState({allProducts: res.data})
                console.log(res.data)
            }
        })
        .catch (err => {
            console.log(err)
        })
    }

    render(){
        return (
            <div id="adminPanelProducts">
                <div id="productsHeader">
                    <h2>Manage Products</h2>
                    <button id="addProductButton" type="button">Add Product</button>
                </div>
                <div id="productsMain">
                    <span>
                        <h3>Search for a product</h3>
                        <input type="text" 
                            value={this.state.searchQuery}
                            onChange={e=>{this.updateSearchQuery(e.target.value)}}/>
                    </span>

                    <div id="searchResults">
                        {this.state.searchQuery !== "" ? 
                            this.determineSelectedProducts().map(product => < AdminSearchResult onClick={()=>{this.setEditingState(product._id, true)}} product={product}/>) :
                            null
                        }
                    </div>

                </div>
            </div>
        )
    }
}