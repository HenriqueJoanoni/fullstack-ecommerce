import react, { Component} from "react"
import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"
import AdminSearchResult from "./AdminSearchResult"
import EditProductModal from "./EditProductModal"
import AddProductModal from "./AddProductModal"


export default class AdminPanelProducts extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchQuery: "",
            allProducts: [],
            editingID: null,
            editingMode: false,
            addingMode: false
        }
    }

    updateSearchQuery = newVal => {
        this.setState({searchQuery: newVal})
    }

    setEditingState = (id, editing) => {
        console.log("here")
        if (!editing){
            this.setState({editingID: null, editingMode: false})
        } else {
            this.setState({editingID: id, editingMode: true})
        }
    }

    setAddingState = val => {
        this.setState({addingMode: val})
    }

    determineSelectedProducts = () => {
        //compare against both name and SKU 
        let regex = new RegExp(`${this.state.searchQuery}`, "i") 
        return [...this.state.allProducts].filter(product => 
            regex.test(product.product_name) || regex.test(product.product_sku)
        )
    }

    refreshProducts = () => {
        axios.get(`${SERVER_HOST}/products`)
        .then(res => {
            if (res.data){
                this.setState({allProducts: res.data})
            }
        })
    }

    componentDidMount(){
        this.refreshProducts()
    }

    render(){
        if (this.state.editingMode){
            return <EditProductModal 
                        product={this.state.allProducts.filter(product => product._id===this.state.editingID)[0]}
                        setEditingState={this.setEditingState}
                        refreshProducts={this.refreshProducts}
                    />
        } 
        
        else if (this.state.addingMode){
            return <AddProductModal 
                    setAddingState={this.setAddingState}
                    refreshProducts={this.refreshProducts}
                />
        }

        //if not editing or adding, show main panel
        return (
            <div id="adminPanelProducts">
                <div id="productsHeader">
                    <h2>Manage Products</h2>
                    <button id="addProductButton" type="button" onClick={()=>{this.setAddingState(true)}}>Add Product</button>
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
                            this.determineSelectedProducts().map(product => < AdminSearchResult key={product._id} setEditingState={this.setEditingState} product={product}/>) :
                            null
                        }
                    </div>

                </div>
            </div>
        )
    }
}