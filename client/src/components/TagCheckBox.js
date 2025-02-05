import React, {Component} from "react"

export default class TagCheckBox extends Component {
    constructor(props) {
        super(props)
        this.state = {checked: false}
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
                    name={`${this.props.tagname}_cb`}
                    id={`${this.props.tagname}_cb`}
                    value={this.props.name}
                    checked={this.state.checked}
                    onChange={this.updateCheckBox}
                />
                <label htmlFor={`${this.props.tagname}_cb`}>
                    {this.props.name}
                </label>
            </div>
        );
    }
}