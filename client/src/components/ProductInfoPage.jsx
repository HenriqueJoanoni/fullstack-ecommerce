import React, {Component} from "react"
import {Link} from "react-router-dom"
import Header from "./Header"
import {guitarSample, guitarPlay, gibson, leftArrowIcon, rightArrowIcon, returnArrowIcon} from '../images';
import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"
import PageFooter from "./PageFooter";

export default class ProductInfoPage extends Component {
    constructor(props) {
        super(props)

        


        this.state = {
            _id: this.props.match.params._id,
            slideshowIndex: 0,
            product: {},
            imageDatas: {}
            
        }
    }

    handleAddToCart = () => {
        this.setState({inCart: true})
        this.props.addToCart(this.state.product._id, this.state.product.product_name, this.state.product.product_price)
    }

    handleRemoveFromCart = () => {
        this.setState({inCart: false})
        this.props.removeFromCart(this.state.product._id)
    }

    handleUpdateQuantity = newVal => {
        {console.log(newVal)}
        //remove by setting qty to 0
        if (parseInt(newVal) === 0){
            this.handleRemoveFromCart()
        } else {
            this.props.updateCart(this.state.product._id, newVal)
        }
    }


    changeSlideShowImage = change => {
        //left 
        if (this.change === 1){
            if (this.state.slideshowIndex + 1 >= this.state.product.product_images.length){
                
                this.setState({slideshowIndex: 0})
            }
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/products/${this.props.match.params._id}`)
        .then(res => {
            if (res.data) {
                this.setState({product: res.data})
                //get image data for each product
                res.data.product_images.forEach((image, index) => {
                    axios.get(`${SERVER_HOST}/products/image/${image}`)
                    .then(res => {
                        if (res.data){
                            this.setState({
                                imageDatas: {...this.state.imageDatas, [index]: `data:;base64, ${res.data.data}`}
                            })
                        }
                    })
                })
            } else {
                console.log("not found")
            }
        })
        
        

        
    }

    render() {
        return (
            <>
                <Header/>
                {console.log(this.props.cart)}
                <div className="productInfoContainer">
                    <span>
                        <Link to="/products">
                            <img className="returnArrow" src={returnArrowIcon} alt="return icon"/>
                        </Link>
                        <h2>
                            {typeof this.state.product.product_name !== "undefined" ?
                                this.state.product.product_name : "unknown"}
                        </h2>
                    </span>
                    <div className="productInfo">
                        <div className="slideshow">
                            <button type="button" onClick={() => {
                                this.setState(
                                    {
                                        slideshowIndex: this.state.slideshowIndex === 0 ?
                                            this.props.product.product_images.length - 1 : this.state.slideshowIndex - 1
                                    }
                                )
                            }}>
                                <img className="slideshowArrow" src={leftArrowIcon} alt="left arrow icon"/>
                            </button>

                            <img className="slideshowImage"
                                 src={this.state.imageDatas[this.state.slideshowIndex]} 
                                 alt="slideshow content"/>
                            <button type="button" onClick={() => {
                                this.setState(
                                    {
                                        slideshowIndex: parseInt(this.state.slideshowIndex + 1) %
                                            this.state.product.product_images.length
                                    }
                                )
                            }}>
                                <img className="slideshowArrow" src={rightArrowIcon} alt="right arrow"/>
                            </button>
                        </div>
                        <div className="productStats">
                            <p>
                                €{typeof this.state.product.product_price !== "undefined" ?
                                    this.state.product.product_price : "unknown"}
                            </p>
                            <p>
                                {typeof this.state.product.product_description !== "undefined" ?
                                    this.state.product.product_description : "unknown"}
                            </p>
                            <p>
                                Brand: {typeof this.state.product.product_brand !== "undefined" ?
                                    this.state.product.product_brand : "unknown"}
                            </p>
                            <p>Other Info:</p>

                            {
                            //add / remove button
                            typeof this.props.cart[this.state._id] === "undefined" ?
                            <button type="button" onClick={this.handleAddToCart}>Add to cart</button> :
                            <button type="button" onClick={this.handleRemoveFromCart}>Remove from cart</button>
                            }   
                    
                            {
                            // qty input
                            typeof this.props.cart[this.state._id] !== "undefined" ? 
                            <div className="cartControls">
                                <input type="number" min="0" value={this.props.cart[this.state._id].qty} onChange={(e)=>{this.handleUpdateQuantity(e.target.value)}}/>
                            </div> : null}
                        </div>
                    </div>
                </div>
                <PageFooter/>
            </>
        )
    }
}