import React, { Component } from 'react';
import './FaceRecognition.css';
import Clarifai from '../../../node_modules/clarifai';
import ImageLinkForm from "../image-link-form/ImageLinkForm";


class FaceRecognition extends Component {

    constructor() {
        super();
        this.state = {
            input: '',
            imageURL: '',
            box: {},
            route: 'face'
        }
    }

    onInputChange = (event) => {
        this.setState({
            input: event.target.value
        })
    };

    onButtonClick = () => {
        this.setState(
            {
                imageURL: this.state.input
            }
        );
        this.props.app.models.predict(Clarifai.FACE_DETECT_MODEL,
            this.state.input).then(
                response => {
                    this.setBox(this.calculateFaceBox(response))
                })
            .catch(error => console.log(error));

    };

    calculateFaceBox = (data) => {
        const face = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById("image")
        const width = Number(image.width)
        const height = Number(image.height)
        //console.log(data.outputs[0].data.regions[0].region_info.bounding_box)
        return {
            leftCol: face.left_col * width,
            rightCol: width - (face.right_col * width),
            topRow: face.top_row * height,
            bottomRow: height - (face.bottom_row * height)
        }
    }

    setBox = (box) => {
        this.setState(
            {
                box: box
            }
        )
    }

    render() {
        return (
            <div>
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonClick={this.onButtonClick} />
                <div className='absolute mt2'>
                    <img
                        className='image'
                        id='image'
                        alt=''
                        width='500px'
                        height='auto'
                        src={this.state.imageURL} />
                    <div
                        className='face-box'
                        style={{
                            bottom: this.state.box.bottomRow,
                            top: this.state.box.topRow,
                            right: this.state.box.rightCol,
                            left: this.state.box.leftCol
                        }}>
                    </div>
                </div>
            </div>


        );
    }

};

export default FaceRecognition;