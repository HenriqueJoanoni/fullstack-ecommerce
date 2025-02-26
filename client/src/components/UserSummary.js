import react, {Component} from "react"
import { loggedUser } from "../images"
import PurchaseCard from "./PurchaseCard"
import ConfirmDeleteModal from "./ConfirmDeleteModal"
import { bin1 } from "../images"
import { bin2 } from "../images"
import { returnArrowIcon } from "../images"
import axios from "axios"
import { SERVER_HOST } from "../config/global_constants"


export default class userSummary extends Component{
    constructor(props){
        super(props)
        this.state = {
            allPurchases: [],
            confirmingDelete: false,
            sortField: "purchase_total",
            sortDirection: 1,
            dateSearchQuery: "",
            filterStartDate: null,
            filterEndDate: new Date().toISOString().split("T")[0],
            profilePhotoData: ""
        }
        // to limit date to today {/*  https://stackoverflow.com/questions/32378590/set-date-input-fields-max-date-to-today  */}
        

        
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
                purchaseDate: new Date(2025, 0, 1),
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

    updateSort = val => {
        console.log(val)

        switch (val){
            case "total_h_l":
                this.setState({sortField: "purchase_total", sortDirection: -1})
                break
            case "total_l_h":
                this.setState({sortField: "purchase_total", sortDirection: 1})
                break
        }
    }

    sortPurchases = purchases => {
        let sortedPurchases = []
        if (this.state.sortField === "purchase_total"){
            sortedPurchases = [...purchases].sort((a, b) => {
                let aTotal = Object.keys(a.items).reduce((total, item)=>
                    total + (a.items[item].qty * a.items[item].price), 0)
                console.log("aTotal: " + aTotal)

                let bTotal = Object.keys(b.items).reduce((total, item)=>
                    total + (b.items[item].qty * b.items[item].price), 0)
                console.log("bTotal: " + bTotal)


                return this.state.sortDirection * (aTotal - bTotal)
            })
        }
        console.log(sortedPurchases)

        return sortedPurchases
    }

    determineSelectedPurchases =()=>{
        /*
            This entire function is hot garbage,
            but then again what function that deals with dates isn't?
        */

        console.log(this.state.allPurchases)
        let selectedPurchases = [...this.state.allPurchases]

        
        if (this.state.dateSearchQuery!== ""){
            selectedPurchases = selectedPurchases.filter(purchase => {
                //remove non digit chars to make comparing easier, requires global flag for some reason
                console.log("dates:")
                let date = purchase.purchaseDate
                let editedDateString = `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`
                let editedSearchString = this.state.dateSearchQuery.replaceAll(/\D/g, " ")
                return editedDateString.includes(editedSearchString)
            })
        }

        //filters
        console.log(this.state.filterStartDate)
        //start
        if (this.state.filterStartDate != null && this.state.filterStartDate != ""){
            let startDate = new Date(this.state.filterStartDate)
            selectedPurchases = selectedPurchases.filter(purchase => new Date(purchase.sale_date) >= startDate)
        }

        //end
        if (this.state.filterEndDate != null && this.state.filterEndDate != ""){
            console.log("here2")
            let endDate = new Date(this.state.filterEndDate)   
            selectedPurchases = selectedPurchases.filter(purchase => new Date(purchase.sale_date) <= endDate )
        }

        
        return selectedPurchases
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

    

    componentDidMount(){
        //PROFILE PHOTO
        if (this.props.user.user_profile_picture != ""){
            axios.get(`${SERVER_HOST}/profile/photo/${this.props.user.user_profile_picture}`)
            .then(res => {
                if (res.data){
                    this.setState({profilePhotoData: `data:;base64, ${res.data.profilePhoto}`})
                }
            })
        }
        else {
            this.setState({profilePhotoData: loggedUser})
        }

        //PURCHASE DATA
        axios.get(`${SERVER_HOST}/purchasesByUserID/${this.props.userID}`)
        .then(res => {
            if (res.data){
                this.setState({allPurchases: res.data})
            } else {
                console.log(res.error)
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
                        <button className="returnArrowButton" onClick={()=>{this.props.toggleUserSummary(null)}}>
                            <img src={returnArrowIcon} alt="return arrow icon"/>
                        </button>
                    <div>
                        <img src={this.state.profilePhotoData}/>

                        <span>
                            <p>{this.props.user.first_name} {this.props.user.last_name}</p>
                            <p>{this.props.user.user_email}</p>
                        </span>

                    </div>

                    <div className="flexCol">
                        <p>Joined on: {new Date(this.props.user.join_date).toISOString().split("T")[0]}</p>
                        <p>Total Spent: {this.props.user.total_spent}</p>
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
                    <div>
                        <label htmlFor="userSummarySort">Sort By:</label>
                        <select onChange={(e)=>{this.updateSort(e.target.value)}}>
                            <option value="total_l_h">Total Spent (low to High)</option>
                            <option value="total_h_l">Total Spent (High to Low)</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="purchaseDateSearch">Search Dates:</label>
                        <input type="text" 
                            value={this.state.dateSearchQuery}
                            placeholder="date" 
                            onChange={(e)=>{this.setState({dateSearchQuery: e.target.value})}}
                        />
                    </div>

                    <div className="dateFilters">
                            <label htmlFor="startDate">Start Date</label>
                            <input type="date" 
                                value={this.state.filterStartDate}
                                onChange={(e)=>{this.setState({filterStartDate: e.target.value})}}
                            />

                            <label htmlFor="endDate">End Date</label>
                            <input type="date" 
                                max={new Date().toISOString().split("T")[0]}
                                value={this.state.filterEndDate}
                                onChange={(e)=>{this.setState({filterEndDate: e.target.value})}}    
                            />
                            
                        </div>
                </div>
                <div className="userPurchaseResultsContainer">
                    {this.sortPurchases(this.determineSelectedPurchases())
                    .map(purchase => <PurchaseCard purchase={purchase} showUser={false}/>)}
                </div>
            </div>

            
        )
    }
}