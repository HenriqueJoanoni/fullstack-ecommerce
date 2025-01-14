import React, {Component} from "react";
import TagCheckBox from "./TagCheckBox"

export default class SearchTools extends Component {

    constructor(props){
        super(props)
        this.state = {
            filter: "default"
        }
        this.tags = ["acoustic", "electric", "bass", "electroacoustic"]
    }

    updateSortField = e => {
        this.props.updateSort(e.target.value)
        this.setState({filter: e.target.value})
        
    }


    render(){
        return (
            <div id="searchToolsContainer">
                <div id="searchToolsRow1">
                    <input type="text" value={this.props.searchQuery} onChange={(e)=>this.props.updateSearchQuery(e)} placeholder="Search Results:"></input>
                    <div id="sortContainer">
                        <select value={this.state.filter} onChange={this.updateSortField}>
                            <option value="default">Sort By</option>
                            <option value="name_a_z">Name: A-Z</option>
                            <option value="name_z_a">Name: Z-A</option>
                            <option value="price_l_h">Price: Low - High</option>
                            <option value="price_h_l">Price: High - Low</option>
                        </select>
                    </div>
                </div>
                <div id="searchTools">
                    <div id="tagsContainer">
                        <h4>Filter Results</h4>
                        {this.tags.map(tag => <TagCheckBox toggleTag={this.props.toggleTag} name={tag}/>)}
                    </div>
                </div>
            </div>
        )
    }
    
}