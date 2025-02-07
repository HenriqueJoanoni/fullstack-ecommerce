import react, { Component} from "react"


export default class EditProductModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            formValues: {
                product_name: "",
                qty_in_stock: "",
                product_description: "",
                product_brand: "",
                product_price: "",
                product_tags: ""
            },

            errorMessages: {
                product_name: "",
                qty_in_stock: "",
                product_description: "",
                product_brand: "",
                product_price: "",
                product_tags: ""
            }
        }
    }


    updateFormValues = e => {
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

    addProduct =()=>{
        this.validateFormValues()

        if (Object.keys(this.state.errorMessages).every(key => this.state.errorMessages[key].length === 0)){
            console.log("valid") //update function here
        } 
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
        if (this.state.formValues.qty_in_stock.length === 0){
            newErrorMessages.qty_in_stock = "Quantity in stock is mandatory."
        }
        else if (parseFloat(this.state.formValues.qty_in_stock) < 0){
            newErrorMessages.qty_in_stock = "Quantity must be at least 0."
        } else if (/\D/.test(this.state.formValues.qty_in_stock)){
            newErrorMessages.qty_in_stock = "Quantity must be a number."
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
        } else if (/$\d+(\.\d{2})?^/.test(this.state.formValues.product_price)){
            newErrorMessages.product_price = "Price must be a valid number."
        }



        //update all
        this.setState({errorMessages: newErrorMessages})
    }

    render(){
        return (
            <div id="addProductModal" className="modal">
                {console.log(this.props.product)}
                <div className="productFormContainer">
                    <h2>Add New Product</h2>
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

                        <div>
                            <button type="button" onClick={()=>{this.props.setAddingState(false)}}>Cancel</button>
                            <button type="button" onClick={this.addProduct}>Add Product</button>
                        </div>

                        

                    </form>
                </div>
            </div>
        )
    }
}