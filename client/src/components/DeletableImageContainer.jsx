import react, {Component} from "react"
import axios from "axios"
import { SERVER_HOST } from "../config/global_constants"

export default class DeletableImageContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            imageData: ""
        }
    }

    deleteImage = () => {
        axios.delete(`${SERVER_HOST}/products/image/${this.props.productID}/${this.props.imageURL}`)
        .then(res => {
            if (res.data){

            }
        })
    }

    getImage = (url) => {
        axios.get(`${SERVER_HOST}/products/image/${url}`)
        .then(res => {
            if (res.data){
                this.setState({imageData: `data:;base64, ${res.data.data}`})
            } else {
                return null
            }
        })
    }

    

    componentDidMount(){
        this.getImage(this.props.imageURL)
    }

    render(){
        return(
            <div className="deletableImageContainer">
                <button type="button" onClick={this.deleteImage}>X</button>
                <img className="imageimageimage" src={this.state.imageData}
                    alt="Image Loading..."
                />
            </div>
        )
    }
}