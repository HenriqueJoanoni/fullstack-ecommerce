import react, { Component} from "react"
import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"
import { MAX_PRODUCT_IMAGES } from "../config/global_constants"
import ConfirmDeleteModal from "./ConfirmDeleteModal"
import TagCheckBox from "./TagCheckBox"
import DeletableImageContainer from "./DeletableImageContainer"

export default class EditProductModal extends Component {
    constructor(props){
        super(props)
        let oldProduct = this.props.product
        this.state = {
            formValues: {
                ...this.props.product
            },

            errorMessages: {
                product_name: "",
                qty_in_stock: "",
                product_description: "",
                product_brand: "",
                product_price: "",
                product_tags: "",
            
            },
            selectedFile: null,

            showConfirmModal: false
        }

        this.allTags = ["Acoustic", "Electric", "Bass", "Electroacoustic", "Accessory", "Amplifier", "Product", "Strings", "Picks", "New", "Other"]
    }


    updateFormValues = e => {
        if (e.target.type === "checkbox"){
            return
        }
        let newObj = {}
        Object.keys(this.state.formValues).forEach(key => {
            //key that was changed
            if (key===e.target.name){
                newObj[key] = e.target.value    
            }
            //all other keys
            else {
                newObj[key] = this.state.formValues[key]
            }
        })

        this.setState({formValues: newObj})
    }

    saveChanges =()=>{
        let errorMessages = this.validateFormValues()

        console.log(this.state.formValues)
        console.log(this.state.errorMessages)
        let allValid = Object.keys(errorMessages).every(key => errorMessages[key] === "")

        //update if all error messages are empty
        if (allValid){
            axios.put(`${SERVER_HOST}/products/${this.props.product._id}`, this.state.formValues)
            .then(res => {
                console.log(res)
                if (!res.data){
                    
                    window.alert("Error - Could not modify data")
                } else {
                    //successful update
                    this.props.setEditingState(null, false)
                    this.props.refreshProducts()
                }
            })

        } 
    }

    confirmDelete =()=>{
        this.setState({showConfirmModal: true})
    }

    deleteProduct = () => {
        axios.delete(`${SERVER_HOST}/products/${this.props.product._id}`)
        .then(res => {
            this.props.setEditingState(null, false)
            this.props.refreshProducts()
        })
    }

    setSelectedFile = e => {
        this.setState({selectedFile: e.target.files[0]})
    }

    uploadImage = ()=>{
        if (this.state.selectedFile === null || this.state.selectedFile === undefined){
            return  
        }
        let formData = new FormData()
        formData.append("product_photo", this.state.selectedFile)
        axios.post(`${SERVER_HOST}/products/imageUpload`, formData, {headers: {"Content-type": "multipart/form-data"}})
        .then(res => {
            if (res.data){
                setTimeout(()=>{}, 100)
                this.setState({formValues: {...this.state.formValues, ["product_images"]: [...this.state.formValues.product_images, res.data.url]}})
                document.getElementById("editProductFileInput").value = ""
            } else {
                window.alert("Error - Could not upload image")
            }
        })
        
    }

    deleteImage = url => {
        axios.delete(`${SERVER_HOST}/products/image/${url}`)
        .then(res => {
            if (res.data){
                this.setState({formValues: {...this.state.formValues, ["product_images"]: this.state.formValues.product_images.filter(img => img !== url)}})
            } else {
                window.alert("Could not delete photo.")
            }
        })
    }




    validateFormValues = () => {
        let newErrorMessages  = {
            product_name: "",
            qty_in_stock: "",
            product_description: "",
            product_brand: "",
            product_price: "",
            product_tags: ""
        }

        //product_name
        if (this.state.formValues.product_name.length === 0){
            newErrorMessages.productName = "Product Name is mandatory"
        }
        else if (this.state.formValues.product_name.length < 8){
            newErrorMessages.productName = "Product Name must be at least eight characters"
        } 


        //qty
        if (parseInt(this.state.formValues.qty_in_stock) === 0){
            newErrorMessages.qty_in_stock = "Quantity in stock is mandatory."
        }
        else if (parseFloat(this.state.formValues.qty_in_stock) < 0){
            newErrorMessages.qty_in_stock = "Quantity must be at least 0."
        } else if (/\D/.test(this.state.formValues.qty_in_stock)){
            newErrorMessages.qty_in_stock = "Quantity must be a number."
        } else if (this.state.formValues.qty_in_stock === ""){
            newErrorMessages.qty_in_stock = "Quantity in stock is mandatory."
        }

        //product description
        if (this.state.formValues.product_description.length < 10){
            newErrorMessages.product_description = "Description must be at least 10 characters."
        } 

        //brand
        if (this.state.formValues.product_brand.length < 3){
            newErrorMessages.product_brand = "Brand must be at least 3 characters."
        }

        //price
        if (this.state.formValues.product_price === ""){
            newErrorMessages.product_price = "Price is mandatory."
        } else if (parseFloat(this.state.formValues.product_price) <= 0){
            newErrorMessages.product_price = "Price must be greater than 0."
        } else if (!/^\d+(\.\d{2})?$/.test(this.state.formValues.product_price)){
            newErrorMessages.product_price = "Price must be a valid number."
        }

        //product tags
        if (this.state.formValues.product_tags.length === 0){
            newErrorMessages.product_tags = "Product must have at least one tag."
        }

        //images
        if (this.state.formValues.product_images.length === 0){
            newErrorMessages.product_images = "Product must have at least one image"
        }

        console.log("new Error messages")
        console.log(newErrorMessages)

        //update all
        this.setState({errorMessages: newErrorMessages})

        return newErrorMessages
    }


    toggleTag = val => {
        //add key if absent
        if (!this.state.formValues.product_tags.includes(val.toLowerCase())){
            let newTags = [...this.state.formValues.product_tags, val.toLowerCase()]
            let newFormValues = {...this.state.formValues, ["product_tags"]: newTags}
            this.setState({formValues: newFormValues})
        }
        //remove key if present
        else {
            let newTags = this.state.formValues.product_tags.filter(tag => tag !== val)
            this.setState({formValues: {...this.state.formValues, ["product_tags"]: newTags}})
        }
    }

    render(){
        return (
            <div id="editProductModal" className="modal">
                {console.log(this.state.formValues)}
                {this.state.showConfirmModal ? 
                    <ConfirmDeleteModal 
                        confirmFunc={this.deleteProduct}
                        cancelFunc={()=>{this.setState({showConfirmModal: false})}}
                    /> 
                     : null /* show confirm delete modal? */
                }
                <div className="productFormContainer">
                    <h2>Edit Product</h2>
                    <form onChange={e=>{this.updateFormValues(e)}}>
                        <span className="formRow">
                            <div className="formItem">
                                <label htmlFor="product_name">Name:</label>
                                <input type="text" name="product_name" value={this.state.formValues["product_name"]}/>
                                <p className="errorMessage">{this.state.errorMessages.product_name}</p>
                            </div>

                            <div className="formItem">
                                <label htmlFor="qty_in_stock">Quantity In Stock:</label>
                                <input type="text" name="qty_in_stock" value={this.state.formValues["qty_in_stock"]}/>
                                <p className="errorMessage">{this.state.errorMessages.qty_in_stock}</p>
                            </div>
                        </span>

                        <span className="formRow">
                            <label htmlFor="product_description">Product Description</label>
                            <textarea name="product_description" value={this.state.formValues["product_description"]}></textarea>
                            <p className="errorMessage">{this.state.errorMessages.product_description}</p>

                        </span>

                        <span className="formRow">
                            <div className="formItem">
                                <label htmlFor="product_brand">Product Brand:</label>
                                <input type="text" name="product_brand" value={this.state.formValues["product_brand"]} />
                                <p className="errorMessage">{this.state.errorMessages.product_brand}</p>

                            </div>

                            <div className="formItem">
                                <label htmlFor="product_price">Product Price:</label>
                                <input type="text" name="product_price" value={this.state.formValues["product_price"]}/>
                                <p className="errorMessage">{this.state.errorMessages.product_price}</p>

                            </div>
                        </span>

                        <span className="formRow">
                            <p>Product Tags:</p>
                            <p className="errorMessage">{this.state.errorMessages.product_tags}</p>
                            <div className="formItem" id="editFormTags">
                                {this.allTags.map(tag => <TagCheckBox 
                                                            key={`${tag}_edit_cb`}
                                                            name={tag}
                                                            tagName={tag}
                                                            checked={this.props.product.product_tags.includes(tag.toLowerCase())}
                                                            toggleTag={this.toggleTag}/>)}
                            </div>
                        </span>


                        <span className="formRow">
                            <p>Product Images:</p>
                            <div className="imagesContainer">
                                {this.state.formValues.product_images.map(url => <DeletableImageContainer key={url}
                                                                                                        imageURL={url}
                                                                                                        deleteImage={this.deleteImage}
                                                                                                        productID={this.props.product._id}/>)}

                            </div>
                            <p className="errorMessage">{this.state.errorMessages.product_images}</p>
                            <input type="file" 
                                    name="fileInput" 
                                    id="editProductFileInput"
                                    onChange={(e)=>this.setSelectedFile(e)}
                                    disabled={this.state.formValues.product_images.length >= MAX_PRODUCT_IMAGES} />
                            <button type="button" onClick={this.uploadImage}>Upload Image</button>
                        </span>

                        <div>
                            <button type="button" onClick={()=>{this.props.setEditingState(null, false)}}>Cancel</button>
                            <button type="button" onClick={this.saveChanges}>Save Changes</button>
                            <button type="button" onClick={this.confirmDelete}>Delete</button>
                        </div>

                        

                    </form>
                </div>
            </div>
        )
    }
}