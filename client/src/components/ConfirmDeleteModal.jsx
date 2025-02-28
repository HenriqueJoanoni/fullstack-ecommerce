import react, {Component} from "react"

export default class ConfirmDeleteModal extends Component {
    constructor(props){
        super(props)
    }

    handleCancel = e => {
        e.preventDefault()
        this.props.cancelFunc()
    }

    handleConfirm = e => {
        e.preventDefault()
        this.props.confirmFunc()
    }



    render(){
        return (
            <div className="confirmDeleteModal">
                <p>Are you sure you want to delete {this.props.name}?</p>
                <p>This action cannot be undone</p>

                <div className="confirmDeleteButtons">  
                    <button type="button" onClick={this.handleCancel}>Cancel</button>
                    <button type="button" onClick={this.handleConfirm}>Delete</button>
                </div>
            </div>
        )
    }
}