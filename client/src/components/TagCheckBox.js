import React, {Component} from "react"

export default class TagCheckBox extends React.Component {
    constructor(props){
        super(props)
        this.state = {checked: false}
    }

    updateCheckBox =(e)=> {
        this.setState({checked: !this.state.checked})
        this.props.toggleTag(e.target.value)
        
    }

    render() {
        return (
            <div className="tagCheckBox">
                <label htmlFor={`${this.props.tagname}_cb`}>{this.props.name}</label>
                <input type="checkbox" 
                        name={`${this.props.tagname}_cb`}
                        value={this.props.name} 
                        checked={this.state.checked}
                        onChange={(e)=>this.updateCheckBox(e)}
                />
            </div>
        )
    }
}