import react, {Component} from "react"
import { loggedUser } from "../images"
import PurchaseCard from "./PurchaseCard"
import ConfirmDeleteModal from "./ConfirmDeleteModal"
import { bin1 } from "../images"
import { bin2 } from "../images"
import axios from "axios"
import { SERVER_HOST } from "../config/global_constants"


export default class userSummary extends Component{
    constructor(props){
        super(props)
        this.state = {
            confirmingDelete: false
        }
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

    deleteUser = () => {
        axios.delete(`${SERVER_HOST}/delete/${this.props.user._id}`)
        .then(res => {
            if (res.error){
                console.log(res.error)
            } else {
                this.props.toggleUserSummary(null)
                this.props.refreshUsers()
            }
        })
    }


    render(){
        return (
            <div className="userPurchaseSummaryContainer">
                {this.state.confirmingDelete ? 
                    <ConfirmDeleteModal name={`user '${this.props.user.first_name} ${this.props.user.last_name}'`}
                                        confirmFunc={this.deleteUser}
                                        cancelFunc={()=>{this.setState({confirmingDelete: false})}}/> : 
                    null
                }
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

                    <div>
                        <button className="userDeleteButton" 
                            type="button" 
                            onClick={(e)=>{this.setState({confirmingDelete: true})}}
                        >
                            <img src={bin1}/>
                        </button>  
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