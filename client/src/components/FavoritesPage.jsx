import React, { Component } from "react"
import Header from "./Header"
import PageFooter from "./PageFooter"

export default class FavoritesPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            favorites: [],
            loading: true
        }
    }

    componentDidMount() {
        if (this.props.location.state?.userFavorites) {
            this.setState({
                favorites: this.props.location.state.userFavorites,
                loading: false
            })
        } else {
            this.setState({ loading: false })
        }
    }

    renderFavorites() {
        const { favorites } = this.state

        if (favorites.length === 0) {
            return <p>No Favorites yet :(</p>
        }

        return (
            <div className="favorites-grid">
                {favorites.map((product) => (
                    <div key={product._id} className="favorite-item">
                        <img
                            src={product.product_picture?.[0]}
                            alt={product.product_name}
                        />
                        <h3>{product.product_name}</h3>
                        <p>{product.product_description}</p>
                        <p>€{product.product_price}</p>
                    </div>
                ))}
            </div>
        )
    }

    render() {
        const { loading } = this.state

        return (
            <>
                <div className="app-container">
                    <div className="header-container">
                        <Header />
                    </div>
                    <section className="favorites-section">
                        <h1 className="favorites-title">Favorites</h1>
                        <div className="container">
                            {loading ? (
                                <p>Loading favorites...</p>
                            ) : (
                                this.renderFavorites()
                            )}
                        </div>
                    </section>
                </div>
                <PageFooter />
            </>
        )
    }
}