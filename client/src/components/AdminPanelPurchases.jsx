import react, { Component} from "react"
import PurchaseCard from "./PurchaseCard"
import axios from  "axios"
import {SERVER_HOST} from "../config/global_constants"

export default class AdminPanelPurchases extends Component {
    constructor(props){
        super(props)
        this.state = {
            allPurchases: [],
            searchQuery: "",
            sortField: "purchase_total",
            sortDirection: 1,
            filterStartDate: null,
            filterEndDate: new Date().toISOString().split("T")[0],
            loading: true
        }
        // to limit date to today {/*  https://stackoverflow.com/questions/32378590/set-date-input-fields-max-date-to-today  */}
    }


    updateSort = val => {
        //console.log(val)
        switch (val){
            case "total_l_h":
                this.setState({sortField: "purchase_total", sortDirection: 1})
                break
            case "total_h_l":
                this.setState({sortField: "purchase_total", sortDirection: -1})
                break

        }
    }

    sortPurchases = purchases => {
        let sortedPurchases = []

        if (this.state.sortField === "purchase_total") {
            sortedPurchases = [...purchases].sort((a, b) => {
                const aTotal = a.items.reduce((total, item) => total + ((item.qty || 0) * (item.price || 0)), 0)
                const bTotal = b.items.reduce((total, item) => total + ((item.qty || 0) * (item.price || 0)), 0)
                return this.state.sortDirection * (aTotal - bTotal)
            })
        }
        return sortedPurchases
    }

    determineSelectedPurchases = () => {
        let selectedPurchases = [...this.state.allPurchases];

        if (this.state.searchQuery) {
            selectedPurchases = selectedPurchases.filter(purchase =>
                purchase.purchaserName.toLowerCase().includes(this.state.searchQuery.toLowerCase())
            );
        }

        if (this.state.filterStartDate) {
            const startDate = new Date(this.state.filterStartDate);
            startDate.setHours(0, 0, 0, 0);
            selectedPurchases = selectedPurchases.filter(purchase =>
                new Date(purchase.sale_date) >= startDate
            );
        }

        if (this.state.filterEndDate) {
            const endDate = new Date(this.state.filterEndDate);
            endDate.setHours(23, 59, 59, 999);
            selectedPurchases = selectedPurchases.filter(purchase =>
                new Date(purchase.sale_date) <= endDate
            );
        }

        return selectedPurchases;
    }


    componentDidMount(){
        axios.get(`${SERVER_HOST}/allSales`)
            .then(res => {
                if (res.data) {
                    this.setState({allPurchases: res.data, loading: false})
                }
            })
            .catch(error => {
                this.setState({loading: false})
                console.error(error)
            })
    }

    render(){
        return (
            <div>
                <h2>View Purchases</h2>
                {console.log(this.state.allPurchases)}
                <div className="purchasesSearchTools">
                    <div>
                        <label htmlFor="purchaseSearchBar">Search:</label>
                        <input type="text" 
                                name="purchaseSearchBar" 
                                onChange={(e)=>{this.setState({searchQuery: e.target.value})}}
                                value={this.state.searchQuery}
                                placeholder="user or purchase date"
                        />
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
                    <div>
                        <label htmlFor="purchasesSortInput">Sort By:</label>
                        <select onChange={(e)=>{this.updateSort(e.target.value)}}>
                            <option value="total_l_h">Total (Low to High)</option>
                            <option value="total_h_l">Total (High to Low)</option>
                        </select>
                    </div>
                </div>

                {this.state.loading ? (
                    <div>Loading purchases...</div>
                ) : (
                    <div className="adminPurchaseResults">
                        {/*console.log(this.sortPurchases(this.determineSelectedPurchases()))*/}
                        {this.sortPurchases(this.determineSelectedPurchases())
                            .map(purchase => <PurchaseCard key={purchase._id} purchase={purchase} showUser={true}/>)}
                    </div>
                )}
            </div>
        )
    }
}