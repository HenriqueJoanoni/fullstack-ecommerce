import React, {Component} from "react";
import Header from "./Header";
import PageFooter from "./PageFooter";

export default class FavoritesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <>
                <Header/>
                <h1>THIS IS THE FAV PAGE</h1>
                <PageFooter/>
            </>
        )
    }
}