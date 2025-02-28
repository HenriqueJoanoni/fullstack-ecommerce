import react, { Component} from "react"
import {guitarSample} from '../images';
import { SERVER_HOST } from "../config/global_constants";
import axios from "axios"

export default class AdminSearchResult extends Component {
    constructor(props){ 
        super(props)
        this.state = {
            imageData: ""
        }
    }

    getImage = url => {
        axios.get(`${SERVER_HOST}/products/image/${url}`)
        .then(res => {
            if (res.data){
                this.setState({imageData: `data:;base64, ${res.data.data}`})
            } else {
                console.log(res.errorMessage)
            }
        })
    }

    componentDidMount(){
        this.getImage(this.props.product.product_images[0])
    }

    render(){
        return (
            <div className="adminSearchResult" onClick={()=>{this.props.setEditingState(this.props.product._id, true)}}>
                <div>
                    <img src={this.state.imageData} alt="Product" />
                    <div className="productDetails">
                        <p><b>{this.props.product.product_name}</b></p>
                        <p>{this.props.product.product_sku}</p>
                        <p>€{this.props.product.product_price}</p>
                    </div>
                </div>
                <p>Qty in Stock: {this.props.product.qty_in_stock}</p>
            </div>
        )
    }
}