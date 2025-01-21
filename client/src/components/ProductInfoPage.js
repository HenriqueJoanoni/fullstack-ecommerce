import React, {Component} from "react"
import {Link} from "react-router-dom"
import Header from "./Header"
import {guitarSample, gibson, leftArrowIcon, rightArrowIcon, returnArrowIcon} from '../images';
import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"

export default class ProductInfoPage extends Component {
    constructor(props) {
        super(props)

        this.testObject = {
            id: 5,
            name: "Epiphone Les Paul Special II",
            description: "A light, crisp sounding guitar, ideal for beginners and experienced players alike",
            price: 1500,
            mainImage: "./guitarSample.jpg",
            photos: [guitarSample, gibson],
            brand: "Epiphone Les Paul"
        }
        

        this.state = {
            slideshowIndex: 0,
            product: {}
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/products/${this.props.match.params._id}`)
            .then(res => {
                if (res.data) {
                    //console.log("found")
                    this.setState({product: res.data})
                } else {
                    console.log("not found")
                }
            })
    }

    render() {
        return (
            <>
                <Header/>
                <div className="productInfoContainer">
                    <span>
                        <Link to="/products">
                            <img className="returnArrow" src={returnArrowIcon} alt="return icon"/>
                        </Link>
                        <h2>{typeof this.state.product.product_name !== "undefined" ? this.state.product.product_name : "unknown"}</h2>
                    </span>
                    <div className="productInfo">
                        <div className="slideshow">
                            <button type="button" onClick={() => {
                                this.setState({slideshowIndex: this.state.slideshowIndex === 0 ? this.testObject.photos.length - 1 : this.state.slideshowIndex - 1})
                            }}>
                                <img className="slideshowArrow" src={leftArrowIcon} alt="left arrow icon"/>
                            </button>

                            <img className="slideshowImage"
                                 src={typeof this.testObject.photos[this.state.slideshowIndex] !== "undefined"
                                     ? this.testObject.photos[this.state.slideshowIndex]
                                     : ""
                                 } alt="slideshow content"/>
                            <button type="button" onClick={() => {
                                this.setState({slideshowIndex: parseInt(this.state.slideshowIndex + 1) % this.testObject.photos.length})
                            }}>
                                <img className="slideshowArrow" src={rightArrowIcon} alt="right arrow" />
                            </button>
                        </div>
                        <div className="productStats">
                            <p>€{typeof this.state.product.product_price !== "undefined" ? this.state.product.product_price : "unknown"}</p>
                            <p>{typeof this.state.product.product_description !== "undefined" ? this.state.product.product_description : "unknown"}</p>
                            <p>Brand: {typeof this.state.product.product_brand !== "undefined" ? this.state.product.product_brand : "unknown"}</p>
                            <p>Other Info:</p>

                            <button type="button">Add to cart</button>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}