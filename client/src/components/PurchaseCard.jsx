import react, {Component} from "react"
import PurchaseCardTableRow from "./PurchaseCardTableRow"

export default class PurchaseCard extends Component {
    formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-EU', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        }).format(amount);
    }

    calculateTotal = (items) => {
        return items.reduce((total, item) =>
            total + (item.qty * item.price), 0);
    }

    render() {
        const { purchase } = this.props;
        const total = this.calculateTotal(purchase.items);

        return (
            <div className="purchaseCard">
                <div className="purchaseInfo">
                    <div className="purchaserName">
                        {this.props.showUser && (
                            <p>Purchased by: {purchase.purchaserName}</p>
                        )}
                    </div>
                    <div className="purchaseTimeTotal">
                        <p>Purchased on: {new Date(purchase.sale_date).toLocaleDateString()}</p>
                        <p>Total: {this.formatCurrency(total)}</p>
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
                        {purchase.items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.qty}</td>
                                <td>{this.formatCurrency(item.price)}</td>
                                <td>{item.product_name}</td>
                                <td>{this.formatCurrency(item.qty * item.price)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="purchaseTotalPrice">
                        Grand Total: {this.formatCurrency(total)}
                    </div>
                </div>
            </div>
        )
    }
}