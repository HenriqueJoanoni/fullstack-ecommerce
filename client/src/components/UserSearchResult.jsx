import React, {Component} from "react"
import { loggedUser } from "../images"
import {SERVER_HOST} from "../config/global_constants"
import axios from "axios"

export default class userSearchResult extends Component {
    constructor(props){
        super(props)
        this.state = {
            profilePhotoData: ""
        }
    }

    getTotalPurchases = () =>{
        return this.props.user.purchases_made
    }   

    componentDidMount() {
        axios.get(`${SERVER_HOST}/profile/photo/${this.props.user.user_profile_picture}`)
        .then(res => {
            console.log(res)
            if (res.data){
                this.setState({profilePhotoData: `data:;base64, ${res.data.profilePhoto}`})
            } else {
                this.setState({profilePhoto: loggedUser})
            }
        })
    }

    render(){
        return (
            <div className="userSearchResult" onClick={e=>{this.props.toggleUserSummary(this.props.user._id)}}>
                <div className="userResultOverview">
                    <img className="userSearchProfilePic" style={{width:50}} src={this.state.profilePhotoData}/>

                    <div className="userInfo">
                        <p className="name">{this.props.user.first_name} {this.props.user.last_name}</p>
                        <p className="email">{this.props.user.user_email}</p>
                    </div>
                </div>

                <div className="userSummaries">
                    {console.log(this.props.user.purchases_made)}
                    <p className="userPurchaseSummary">Number of Purchases: {this.props.user.purchases_made}</p>
                    <p className="userSpendSummary">Total Spent: €{typeof this.props.user.total_spent !== "undefined" ?
                                                                    this.props.user.total_spent.toFixed(2) : 0}</p>
                    <p className="userJoined">Joined On: {`${new Date(this.props.user.join_date).getDate()}`}/
                                                            {`${new Date(this.props.user.join_date).getMonth()+1}`}/
                                                            {`${new Date(this.props.user.join_date).getFullYear()}`}

                    </p>
                </div>
            </div>
        )
    }
}