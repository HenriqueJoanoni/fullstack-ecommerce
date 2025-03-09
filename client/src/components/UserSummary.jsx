import React, {Component} from "react"
import {loggedUser} from "../images"
import ConfirmDeleteModal from "./ConfirmDeleteModal"
import {bin1} from "../images"
import {returnArrowIcon} from "../images"
import axios from "axios"
import PurchaseCard from "./PurchaseCard"
import {SERVER_HOST} from "../config/global_constants"

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
            filterEndDate: null,
            profilePhotoData: ""
        }
        // to limit date to today {/*  https://stackoverflow.com/questions/32378590/set-date-input-fields-max-date-to-today  */}
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
        if (this.state.sortField === "purchase_total") {
            return [...purchases].sort((a, b) => {
                const aTotal = a.items.reduce((total, item) => total + (item.qty * item.price), 0);
                const bTotal = b.items.reduce((total, item) => total + (item.qty * item.price), 0);
                return this.state.sortDirection * (aTotal - bTotal);
            });
        }
        return purchases;
    }

    determineSelectedPurchases = () => {
        let selectedPurchases = [...this.state.allPurchases];

        const currentEndDate = this.state.filterEndDate || new Date().toISOString().split("T")[0];
        const currentStartDate = this.state.filterStartDate;

        selectedPurchases = selectedPurchases.filter(purchase => {
            if (!purchase.sale_date) return false;

            const saleDate = purchase.sale_date.toISOString().split("T")[0];

            let isValid = true;
            if (currentStartDate) isValid = isValid && (saleDate >= currentStartDate);
            if (currentEndDate) isValid = isValid && (saleDate <= currentEndDate);
            return isValid;
        });

        return selectedPurchases;
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

        // PURCHASE DATA
        this.setState({ loadingPurchases: true }, () => {
            axios.get(`${SERVER_HOST}/detailedPurchasesByUserID/${this.props.userID}`)
                .then(res => {
                    if (res.data?.length > 0) {
                        const transformedPurchases = res.data.map(sale => {
                            if (!sale.products || !Array.isArray(sale.products)) {
                                console.warn('Invalid sale:', sale);
                                return null;
                            }

                            return {
                                _id: sale._id,
                                purchaserName: `${this.props.user.first_name} ${this.props.user.last_name}`,
                                sale_date: new Date(sale.sale_date),
                                items: sale.products.map(product => ({
                                    product_name: product.product_name || 'Unnamed Product',
                                    price: product.price || 0,
                                    qty: product.quantity || 1
                                }))
                            };
                        }).filter(Boolean);

                        const sortedSales = transformedPurchases.sort(
                            (a, b) => b.sale_date - a.sale_date
                        );

                        this.setState({
                            allPurchases: sortedSales,
                            filterEndDate: sortedSales[0]?.sale_date.toISOString().split("T")[0],
                            loadingPurchases: false
                        });
                    }
                })
                .catch(error => {
                    this.setState({ loadingPurchases: false });
                    console.error(error);
                });
        });
    }

    render(){
        const processedPurchases = this.sortPurchases(this.determineSelectedPurchases());
        console.log('Debug - All Purchases:', this.state.allPurchases);
        console.log('Debug - Processed Purchases:', processedPurchases);

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
                    {this.state.loadingPurchases ? (
                        <div>Loading purchases...</div>
                    ) : processedPurchases.length > 0 ? (
                        processedPurchases.map(purchase => (
                            <PurchaseCard key={purchase._id} purchase={purchase} />
                        ))
                    ) : (
                        <div className="no-purchases-message">
                            {this.state.allPurchases.length === 0
                                ? "No purchases found for this user"
                                : "No purchases match current filters"}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}