import react, {Component} from "react"
import { loggedUser } from "../images"
import PurchaseCard from "./PurchaseCard"

export default class userPurchaseSummary extends Component{
    constructor(props){
        super(props)
        this.mockPurchases = [ 
            {
                purchaserName: "Christopher Healy",
                purchaseDate: new Date(2025, 1, 20),
                items: [
                     {
                        product_name: "Ibanez RG Series",
                        price: 1000,
                        qty: 2
                    },
                    {
                        product_name: "Fender Medium Picks (Pack of 12)",
                        price: 5.99,
                        qty: 3
    
                    }
                ]
            },
            {
                purchaserName: "Christopher Healy",
                purchaseDate: new Date(2025, 2, 1),
                items: [
                    {
                        product_name: "Marshall DSL40CR",
                        price: 800,
                        qty: 1,
                    },
                    {
                        product_name: "D'addario NYXL (10-46)",
                        price: 12.99,
                        qty: 1
                    }
                ]

            }

            ]

    }


    render(){
        return (
            <div className="userPurchaseSummaryContainer">
                <div className="userSummaryUserInfo">
                    <div>
                        <img src={loggedUser}/>

                        <span>
                            <p>{this.props.user.first_name} {this.props.user.last_name}</p>
                            <p>{this.props.user.user_email}</p>
                        </span>
                    </div>

                    <div className="flexCol">
                        <p>Joined on: {"21/01/25"}</p>
                        <p>Total Spent: {"€1240.50"}</p>
                    </div>
                </div>
                <div className="purchaseSearchTools">
                    <h3>Purchase History</h3>
                </div>
                <div className="userPurchaseResultsContainer">
                    {this.mockPurchases.map(purchase => <PurchaseCard purchase={purchase} showUser={false}/>)}
                    
                </div>
            </div>

            
        )
    }
}