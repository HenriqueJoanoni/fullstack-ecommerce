import React, { Component } from 'react';

export default class ProductCard extends Component {
    constructor(props){
        super(props)
    }


    render(){
        return (
            <div className="card">
                <div className="card-image">
                    <img src={this.props.productImage} alt="Guitar Sample" />
                </div>
                <div className="card-content">
                    <h2>Guitar 5</h2>
                    <p>Affordable!</p>
                </div>
            </div>
        )
    }
}