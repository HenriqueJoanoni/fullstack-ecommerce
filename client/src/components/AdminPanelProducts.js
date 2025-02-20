import react, { Component} from "react"
import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"
import AdminSearchResult from "./AdminSearchResult"
import EditProductModal from "./EditProductModal"
import AddProductModal from "./AddProductModal"
import TagCheckBox from "./TagCheckBox"


export default class AdminPanelProducts extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchQuery: "",
            allProducts: [],
            editingID: null,
            editingMode: false,
            addingMode: false,
            sortDirection: 1,
            sortField: "product_name",
            selectedTags: []
        }

        this.allFilters = [
            "Acoustic", "Electric", "Bass", "Electroacoustic", "Accessory", "Amplifier", "Product", "Strings", "Picks", "New", "Other"
        ]
    }



    updateSortField = val => {
        switch(val){
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


    toggleTag = tag => {
        if (!this.state.selectedTags.includes(tag.toLowerCase())){
            this.setState({selectedTags: [...this.state.selectedTags, tag.toLowerCase()]})
        } else {
            this.setState({selectedTags: 
                this.state.selectedTags.filter(oldTag => oldTag!==tag.toLowerCase())
            })
        }
    }

    sortProducts = products => {
        let sortedProducts = [...products].sort((a, b) => 
            a[this.state.sortField] > b[this.state.sortField] ? this.state.sortDirection : -this.state.sortDirection) 
        return sortedProducts 
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
        let selectedProducts = [...this.state.allProducts]
        console.log(selectedProducts)

        //search query
        if (this.state.searchQuery.length !== 0) {
            let regex = new RegExp(`${this.state.searchQuery}`, "i") 
            return [...this.state.allProducts].filter(product => 
                regex.test(product.product_name) || regex.test(product.product_sku)
            )
        }

        //filters
        if (this.state.selectedTags.length!==0 && !this.state.selectedTags[0] === "new"){
            selectedProducts = selectedProducts.filter(product =>
                product.product_tags.some(tag => 
                    this.state.selectedTags.includes(tag)))
        }

        //filter by new
        if (this.state.selectedTags.includes("new")){
            selectedProducts = selectedProducts.filter(product => product.is_new)
        }

        return selectedProducts
        
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
        console.log(this.state)
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
                    <div id="productsSearchTools">
                        <div>
                            <h3>Search for a product</h3>
                            <input type="text" 
                                value={this.state.searchQuery}
                                onChange={e=>{this.setState({searchQuery: e.target.value})}}
                            />
                        </div>
                        <div>
                            <label htmlFor="productSort">Sort By:</label>
                            <select onChange={(e)=>{this.updateSortField(e.target.value)}}>
                                <option value="name_a_z">Name (A-Z)</option>
                                <option value="name_z_a">Name (Z-A)</option>
                                <option value="price_l_h">Price (Lowest to Highest)</option>
                                <option value="price_h_l">Price (Highest to Lowest)</option>
                            </select>
                        </div>
                    </div>

                    <div className="productFilters">
                        {this.allFilters.map(tag => <TagCheckBox toggleTag={this.toggleTag} name={tag} tagName={tag}/>)}
                    </div>

                    <div id="searchResults">
                        {
                            this.sortProducts(this.determineSelectedProducts())
                            .map(product => < AdminSearchResult 
                                                key={product._id} 
                                                setEditingState={this.setEditingState}
                                                product={product}
                                            />)
                        }
                    </div>

                </div>
            </div>
        )
    }
}