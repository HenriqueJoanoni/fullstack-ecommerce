import React, {Component} from "react"

export default class TagCheckBox extends Component {
    constructor(props) {
        super(props)
        if (this.props.checked){
            this.state = {checked: this.props.checked}
        } else {
            this.state = {checked: false}
        }
        
    }

    updateCheckBox = (e) => {
        this.setState({checked: !this.state.checked})
        this.props.toggleTag(e.target.value)
    }

    render() {
        return (
            <div className="tagCheckBox">
                <input     
                    type="checkbox"
                    name={`${this.props.tagName}_cb`}
                    id={`${this.props.tagName}_cb`}
                    value={this.props.name.toLowerCase()}
                    checked={this.state.checked}
                    onChange={this.updateCheckBox}
                />
                <label htmlFor={`${this.props.tagName}_cb`}>
                    {this.props.name}
                </label>
            </div>
        )
    }
}