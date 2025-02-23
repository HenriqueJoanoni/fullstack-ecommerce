import react, { Component} from "react"
import {SERVER_HOST} from "../config/global_constants"
import axios from "axios"
import UserSearchResult from "./UserSearchResult"
import UserSummary from "./UserSummary"
import TagCheckBox from "./TagCheckBox"

export default class AdminPanelUsers extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchQuery: "",
            allUsers: [],
            selectedUsers: [],
            showingSummary: false,
            summaryID: null,
            sortField: "user_name",
            sortDirection: 1,
            selectedTags: []
        }

        this.userFilterTags = ["New Users", "At Least One Purchase", "Total Spend > €100"]
    }

    determineSelectedUsers = () =>{
        let selectedUsers = [...this.state.allUsers]
        //setTimeout(()=>console.log(selectedUsers), 1000)


        /*
        //search query
        if (this.state.searchQuery!==""){
            selectedUsers = selectedUsers.filter(user => `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`.includes(this.state.searchQuery))
        }

        //filters
        //new users
        //console.log(this.state.selectedTags)
        if (this.state.selectedTags.includes("new users")){
            //subtraction turns times to milliseconds
            const millisecondsPerMonth = 1000 * 60 * 60 * 24 * 31
            console.log(new Date())
            console.log(new Date(selectedUsers[0].join_date))
            
            selectedUsers = selectedUsers.filter(user => Date.now() - new Date(user.join_date) < millisecondsPerMonth)
        }

        if (this.state.selectedTags.includes("at least one purchase")){
            selectedUsers = selectedUsers.filter(user => user.purchases_made >= 1)
        }

        if (this.state.selectedTags.includes("total spend > €100")){
            //selectedUsers = selectedUsers.filter(user)
        }


        */
        





        return selectedUsers

    }

    updateSort = val => {
        switch (val){
            case "name_a_z":
                this.setState({sortField: "user_name", sortDirection: 1})
                break
            case "name_z_a":
                this.setState({sortField: "user_name", sortDirection: -1})
                break
            case "purchases_made_l_h":
                this.setState({sortField: "purchases_made", sortDirection: 1})
                break
            case "purchases_made_h_l":
                this.setState({sortField: "purchases_made", sortDirection: -1})
                break
            case "total_spent_l_h":
                this.setState({sortField: "total_spent", sortDirection: 1})
                break
            case "total_spent_h_l":
                this.setState({sortField: "total_spent", sortDirection: -1})
                break
                    

        }
    }


    sortUsers = users => {
        let sortedUsers = []
        console.log(users)
        //name
        if (this.state.sortField === "user_name"){
            sortedUsers = [...users].sort((a, b) => 
                `${a.first_name} ${a.last_name}}` > `${b.first_name} ${b.last_name}}` ?
                this.state.sortDirection :
                -this.state.sortDirection
            )
        }

        //purchases made
        else {
            sortedUsers = [...users].sort((a, b) => 
                a[this.state.sortField] > b[this.state.sortField] ?
                this.state.sortDirection :
                -this.state.sortDirection
            )
        }
        console.log(sortedUsers)
        return sortedUsers
    }

    toggleUserSummary = id =>{
        this.setState({showingSummary: !this.state.showingSummary,
                        summaryID: id,
                        selectedUser: this.state.allUsers.filter(user=>user._id===id)[0]})
    }

    toggleTag = tag => {
        if (!this.state.selectedTags.includes(tag)){
            this.setState({selectedTags: [...this.state.selectedTags, tag]})
        } else {
            this.setState({selectedTags: this.state.selectedTags.filter(oldTag => oldTag !==tag)})
        }
    }

    refreshUsers = () => {
        let users = axios.get(`${SERVER_HOST}/allUsers`)
        .then(res => {
            if (res.data){
                res.data.forEach(user => {
                    console.log(user)
                    this.getUserPurchases(user._id)
                    .then(userPurchases => {
                        user.purchases_made = userPurchases.length
                        user.total_spent = userPurchases.reduce((total, purchase) => {
                            let purchaseTotal = Object.keys(purchase.items).reduce((total, item) => 
                                total + (purchase.items[item].qty * purchase.items[item].price), 0)
                            return total + purchaseTotal    
                        }, 0)
                    })
                
                })
                console.log(res.data)
                setTimeout((()=>this.setState({allUsers: res.data})), 100)
                //this.setState({allUsers: res.data})
            } else {
                console.log(res.error)
            }
        })
    }

    getUserPurchases = async (id) => {
        let purchases = await axios.get(`${SERVER_HOST}/purchasesByUserID/${id}`)
        .then(res => {
            console.log(res.data)
            if (res.data){
                console.log(res.data)
                return res.data
            } else {
                console.log(res.error)
            }
        
        })
        return purchases
    }

    componentDidMount(){
        this.refreshUsers()
    }


    render(){
        return (
            
            <div id="adminPanelUsers">
                {this.state.showingSummary ? 
                    <UserSummary user={this.state.selectedUser}
                        toggleUserSummary={this.toggleUserSummary} 
                        userID={this.state.summaryID} 
                        refreshUsers={this.refreshUsers}
                    />
                    : null
                }
                <h2 id="usersHeader">View Users</h2>
                <div id="usersMain">
                    {console.log(this.state.allUsers)}
                <div>
                    <div>
                        <div>
                            <label htmlFor="usersInput">Search Users:</label>
                            <input type="text"
                                value={this.state.searchQuery}
                                onChange={e=>{this.setState({searchQuery: e.target.value})}}
                            />
                        </div>

                        <div>
                            <label htmlFor="userSortInput">Sort By:</label>
                            <select onChange={(e)=>{this.updateSort(e.target.value)}}>
                                <option value="name_a_z">Name (A-Z)</option>
                                <option value="name_z_a">Name (Z-A)</option>
                                <option value="purchases_made_l_h">Purchases Made (Low to High)</option>
                                <option value="purchases_made_h_l">Purchases Made (High to Low)</option>
                                <option value="total_spent_l_h">Total Spent (Low to High)</option>
                                <option value="total_spent_h_l">Total Spent (High to Low)</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <h3>Filter Users By:</h3>
                        <div>
                            {this.userFilterTags.map(tag => <TagCheckBox 
                                                                key={tag}
                                                                tagName={tag} 
                                                                name={tag} 
                                                                toggleTag={this.toggleTag}
                                                                />)}
                        </div>
                    </div>
                    
                </div>

                    <div id="usersSearchResults">
                        {this.sortUsers(this.determineSelectedUsers())
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