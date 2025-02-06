import react, { Component} from "react"
import {guitarSample} from '../images';

export default class AdminSearchResult extends Component {
    constructor(props){ 
        super(props)
    }

    render(){
        return (
            <div className="adminSearchResult" onClick={()=>{this.props.setEditingState(this.props.product._id, true)}}>
                <div>
                    {this.props.product.product_img !== null ? <img src={guitarSample}/> : null}
                    <div className="productDetails">
                        <p><b>{this.props.product.product_name}</b></p>
                        <p>{this.props.product.product_sku}</p>
                    </div>
                </div>
                <p>Qty in Stock: {this.props.product.qty_in_stock}</p>
            </div>
        )
    }
}