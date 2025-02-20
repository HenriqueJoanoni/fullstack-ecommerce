import react, { Component} from "react"
import PurchaseCard from "./PurchaseCard"

export default class AdminPanelPurchases extends Component {
    constructor(props){
        super(props)
        this.state = {
            allPurchases: [],
            searchQuery: "",
            sortField: "purchase_total",
            sortDirection: 1

        }

        this.purchases =  [
            {
                purchaserID: "123",
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
                purchaserID: "125",
                purchaserName: "Jose Henrique",
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

    sortPurchases = purchases =>{
        let sortedPurchases = []
        //console.log(this.state.sortField)
        //console.log(this.state.sortDirection    )

        if (this.state.sortField === "purchase_total"){
            sortedPurchases = [...purchases].sort((a, b) => {
                let aTotal = Object.keys(a.items).reduce((total, item)=>
                    total + (a.items[item].qty * a.items[item].price), 0)
                //console.log("aTotal: " + aTotal)

                let bTotal = Object.keys(b.items).reduce((total, item)=>
                    total + (b.items[item].qty * b.items[item].price), 0)
                //console.log("bTotal: " + bTotal)


                return this.state.sortDirection * (aTotal - bTotal)
            })
        }
        //console.log(sortedPurchases)

        return sortedPurchases

    }

    determineSelectedPurchases = () => {
        let selectedPurchases = this.purchases.filter(purchase => {
            let include = false;
            //user
            if (`${purchase.purchaserName}`.toLowerCase().includes(this.state.searchQuery.toLowerCase())){
                include = true;
            } 
            //console.log(purchase.purchaseDate)

            return include
        })
        
        //console.log(selectedPurchases)
        return selectedPurchases
    }



    render(){
        return (
            <div>
                <h2>View Purchases</h2>
                <div className="purchasesSearchTools">
                    <div>
                        <label htmlFor="purchaseSearchBar">Search:</label>
                        <input type="text" 
                                name="purchaseSearchBar" 
                                onChange={(e)=>{this.setState({searchQuery: e.target.value})}}
                                value={this.state.searchQuery}
                                placeholder="user or purchase date"
                        />
                    </div>
                    <div>
                        <label htmlFor="purchasesSortInput">Sort By:</label>
                        <select onChange={(e)=>{this.updateSort(e.target.value)}}>
                            <option value="total_l_h">Total (Low to High)</option>
                            <option value="total_h_l">Total (High to Low)</option>
                        </select>
                    </div>
                    
                 
                </div>

                <div className="adminPurchaseResults">
                    {/*console.log(this.sortPurchases(this.determineSelectedPurchases()))*/}
                    {this.sortPurchases(this.determineSelectedPurchases())
                    .map(purchase => <PurchaseCard purchase={purchase} showUser={true}/>)}
                </div>

            </div>
            
        )
    }
}