import react, {Component} from "react"
import { loggedUser } from "../images"

export default class userSearchResult extends Component {
    constructor(props){
        super(props)
    }


    getTotalPurchases = () =>{
        return 4
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

                <p className="userPurchaseSummary">Number of Purchases: {this.getTotalPurchases()}</p>

                
            </div>
        )
    }
}