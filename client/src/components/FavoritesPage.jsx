import React, { Component } from "react";
import Header from "./Header";
import PageFooter from "./PageFooter";

export default class FavoritesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favData: null,
        };
    }

    componentDidMount() {
        console.log("props location: ", this.props.location)
        const { state } = this.props.location;

        if (state && state.favorites) {
            console.log("Favorites Data: ", state.favorites);
            this.setState({ favData: state.favorites });
        }
    }

    render() {
        const { favData } = this.state;

        // const isFavoritesValid = favData && typeof favData === "object" && Object.keys(favData).length > 0;

        return (
            <>
                <div className="app-container">
                    <div className="header-container">
                        <Header />
                    </div>
                    <section className="favorites-section">
                        <h1 className="favorites-title">Favorites</h1>

                        <div className="container">
                            {/*{isFavoritesValid ? (*/}
                            {/*    <div>*/}
                            {/*        <h2>{favData.product_name}</h2>*/}
                            {/*        <p>{favData.product_description}</p>*/}
                            {/*        <p>Price: ${favData.product_price}</p>*/}
                            {/*        <img src={favData.product_picture[0]} alt={favData.product_name} />*/}
                            {/*        /!* Add more details as needed *!/*/}
                            {/*    </div>*/}
                            {/*) : (*/}
                            {/*    <p>No Favorites yet :(</p>*/}
                            {/*)}*/}
                        </div>
                    </section>
                </div>
                <PageFooter />
            </>
        );
    }
}