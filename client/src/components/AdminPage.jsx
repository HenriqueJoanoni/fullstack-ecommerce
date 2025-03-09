import React, {Component} from "react"
import Header from "./Header"
import AdminPanelProducts from "./AdminPanelProducts"
import AdminPanelUsers from "./AdminPanelUsers"
import AdminPanelPurchases from "./AdminPanelPurchases"


export default class AdminPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            controlPanelMode: "products"
        }

        this.modeComponentsMap = {
            "products": <AdminPanelProducts/>,
            "users": <AdminPanelUsers/>,
            "purchases": <AdminPanelPurchases/>
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <div id="adminPageContainer">
                    <div id="adminControlPanel">
                        <div id="adminControlPanelHeader">
                            <button type="button"
                                    onClick={() => {
                                        this.setState({controlPanelMode: "products"})
                                    }}
                                    className={this.state.controlPanelMode === "products" ? "selected" : ""}>
                                Products
                            </button>

                            <button type="button"
                                    onClick={() => {
                                        this.setState({controlPanelMode: "users"})
                                    }}
                                    className={this.state.controlPanelMode === "users" ? "selected" : ""}>
                                Users
                            </button>

                            <button type="button"
                                    onClick={() => {
                                        this.setState({controlPanelMode: "purchases"})
                                    }}
                                    className={this.state.controlPanelMode === "purchases" ? "selected" : ""}>
                                Purchases
                            </button>
                        </div>
                        {
                            this.modeComponentsMap[this.state.controlPanelMode]
                        }
                    </div>
                </div>
            </div>
        )
    }
}