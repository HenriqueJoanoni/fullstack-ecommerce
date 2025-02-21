import react, {Component} from "react"

export default class PurchaseCardTableRow extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <tr>
                <td>{this.props.item.qty}</td>
                <td>€{this.props.item.price}</td>
                <td className="leftAligned">{this.props.item.product_name}</td>
                <td>€{parseInt(this.props.item.qty) * parseFloat(this.props.item.price)}</td>
            </tr>
        )
    }


}