import react, {Component} from "react"
import { loggedUser } from "../images"

export default class userSearchResult extends Component {
    constructor(props){
        super(props)
    }


    getTotalPurchases = () =>{
        return this.props.user.purchases_made
    }

    render(){
        return (
            <div className="userSearchResult" onClick={e=>{this.props.toggleUserSummary(this.props.user._id)}}>
                <div className="userResultOverview">
                    <img className="userSearchProfilePic" style={{width:50}} src={loggedUser}/>

                    <div className="userInfo">
                        <p className="name">{this.props.user.first_name} {this.props.user.last_name}</p>
                        <p className="email">{this.props.user.user_email}</p>
                    </div>
                </div>

                <div className="userSummaries">
                    <p className="userPurchaseSummary">Number of Purchases: {this.getTotalPurchases()}</p>
                    <p className="userSpendSummary">Total Spent: €{this.props.user.total_spent.toFixed(2)}</p>
                    <p className="userJoined">Joined On: {`${new Date(this.props.user.join_date).getDate()}`}/
                                                            {`${new Date(this.props.user.join_date).getMonth()+1}`}/
                                                            {`${new Date(this.props.user.join_date).getYear()}`}

                    </p>
                </div>

                
            </div>
        )
    }
}