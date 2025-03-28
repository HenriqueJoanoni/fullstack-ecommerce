import React, {Component} from "react"
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

    refreshUsers = async () => {
        try {
            const res = await axios.get(`${SERVER_HOST}/allUsers`);
            if (res.data) {
                const updatedUsers = await Promise.all(res.data.map(async (user) => {
                    const userPurchases = await this.getUserPurchases(user._id);

                    /** Calculate purchases made (count) */
                    user.purchases_made = userPurchases?.length || 0;

                    /** Calculate total spent */
                    user.total_spent = userPurchases?.reduce((totalAccumulator, purchase) => {
                        const purchaseTotal = purchase.products?.reduce((productAccumulator, product) => {
                            return productAccumulator +
                                (Number(product.quantity) || 0) *
                                (Number(product.price) || 0);
                        }, 0) || 0;
                        return totalAccumulator + purchaseTotal;
                    }, 0) || 0;

                    return user;
                }));

                this.setState({ allUsers: updatedUsers });
            }
        } catch (error) {
            console.error("Error refreshing users:", error);
        }
    }

    getUserPurchases = async (id) => {
        try {
            const res = await axios.get(`${SERVER_HOST}/purchasesByUserID/${id}`);
            return res.data || [];
        } catch (error) {
            console.error("Error fetching purchases:", error);
            return [];
        }
    }

    componentDidMount() {
        this.refreshUsers()
    }

    render() {
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
<div id="adminPanelUsers">
    <h2 id="usersHeader">View Users</h2>
    <div id="usersMain">
        {console.log(this.state.allUsers)}
        <div id="usersSearchTools">
            <div className="filters-column-adm">
                <div className="filters-section">
                    {/* <label htmlFor="usersInput">Search Users:</label> */}
                    <input
                        type="text"
                        value={this.state.searchQuery}
                        placeholder="Search Users"
                        onChange={e => this.setState({ searchQuery: e.target.value })}
                    />
                    <div className="sort-header">
                        <label htmlFor="userSortInput">Sort:</label>
                        <select onChange={(e) => this.updateSort(e.target.value)}>
                            <option value="name_a_z">Name (A-Z)</option>
                            <option value="name_z_a">Name (Z-A)</option>
                            <option value="purchases_made_l_h">Purchases Made (Low to High)</option>
                            <option value="purchases_made_h_l">Purchases Made (High to Low)</option>
                            <option value="total_spent_l_h">Total Spent (Low to High)</option>
                            <option value="total_spent_h_l">Total Spent (High to Low)</option>
                        </select>
                    </div>
                </div>

                <div className="productFilters">
                    <p classname="h3-adm">Filter Users By:</p>
                    <div>
                        {this.userFilterTags.map(tag => (
                            <TagCheckBox
                                key={tag}
                                tagName={tag}
                                name={tag}
                                toggleTag={this.toggleTag}
                            />
                        ))}
                    </div>
                </div>
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