import react, { Component} from "react"
import {SERVER_HOST} from "../config/global_constants"
import axios from "axios"
import UserSearchResult from "./UserSearchResult"
import UserPurchaseSummary from "./UserPurchaseSummary"

export default class AdminPanelUsers extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchQuery: "",
            allUsers: [],
            showingSummary: false,
            summaryID: null
        }
    }

    determineSelectedUsers = () =>{
        return this.state.allUsers.filter(user => `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`.includes(this.state.searchQuery))
    }

    toggleUserSummary = id =>{

        this.setState({showingSummary: !this.state.showingSummary,
                        summaryID: id,
                        selectedUser: this.state.allUsers.filter(user=>user._id===id)[0]})
    }

    componentDidMount(){
        axios.get(`${SERVER_HOST}/allUsers`)
        .then(res => {
            if (res.data){
                this.setState({allUsers: res.data})
            }
        })
    }


    render(){
        return (
            <div id="adminPanelUsers">
                {this.state.showingSummary ? <UserPurchaseSummary user={this.state.selectedUser} userID={this.state.summaryID} /> : null}
                <h2 id="usersHeader">View Users</h2>
                <div id="usersMain">
                <span>
                    <label htmlFor="usersInput">Search Users:</label>
                    <input type="text"
                        value={this.state.searchQuery}
                        onChange={e=>{this.setState({searchQuery: e.target.value})}}
                    />
                </span>

                    <div id="usersSearchResults">
                        {this.determineSelectedUsers()
                            .map(user => <UserSearchResult 
                                            id={user._id} 
                                            user={user}
                                            toggleUserSummary={this.toggleUserSummary}
                                        />)}
                    </div>  
                
                </div>
                
            </div>


        )
    }
}