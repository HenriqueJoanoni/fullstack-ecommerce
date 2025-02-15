import react, {Component} from "react"
import PurchaseCardTableRow from "./PurchaseCardTableRow"

export default class PurchaseCard extends Component {
    constructor(props){
        super(props)
        console.log(this.props.purchase)
    }

    render(){
        return (
            <div className="purchaseCard">
                <div className="purchaseInfo">
                    <div className="purchaserName">
                        <p>{this.props.showUser ? <p>{this.props.purchase.purchaser_name}</p> : null}</p>
                    </div>
                    <div className="purchaseTimeTotal"> 
                        <p>Purchased on: {this.props.purchase.purchaseDate.toLocaleString()}</p>
                        <p>Total: {Object.keys(this.props.purchase.items).reduce((total, item)=>
                            total + (this.props.purchase.items[item].qty * this.props.purchase.items[item].price), 0)}</p> 
                    </div>
                </div>

                <div className="purchaseItems">
                    <table>
                        <thead>
                            <tr>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Item</th>   
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.purchase.items.map(item => <PurchaseCardTableRow item={item}/>)}
                        </tbody>
                    </table>
                
                    <div className="purchaseTotalPrice">
                        €{Object.keys(this.props.purchase.items).reduce((total, item)=>
                            total + (this.props.purchase.items[item].qty * this.props.purchase.items[item].price), 0)}
                    </div>
                </div>

            </div>
        )
    }
}