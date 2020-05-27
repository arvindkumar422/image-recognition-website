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
            boxes: [],
            demographics: { age: [], gender: [] },
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
                    this.setBox(this.calculateFaceBox(response)
                    )
                }
            ).catch(error => console.log(error));

    };

    calculateFaceBox = (data) => {
        let boxes = [];
        data.outputs[0].data.regions.forEach(
            (element) => {
                const face = element.region_info.bounding_box
                const image = document.getElementById("image")
                const width = Number(image.width)
                const height = Number(image.height)
                boxes.push(
                    {
                        leftCol: face.left_col * width,
                        rightCol: width - (face.right_col * width),
                        topRow: face.top_row * height,
                        bottomRow: height - (face.bottom_row * height)
                    }
                );
            }
        );
        //console.log("boxes : ", boxes);
        if (boxes.length === 1) {
            this.calculateDemographics();
        }
        return boxes;
    }

    calculateDemographics = () => {
        console.log("hmm");
        this.props.app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3",
            this.state.input).then(
                response => {
                    console.log(response);
                    this.setDemographics(this.getAgeAndGender(response))
                }
            ).catch(error => console.log(error));
    }

    getAgeAndGender = (data) => {
        const relevant_data = data.outputs[0].data.regions[0].data.concepts;
        console.log("relevant data : ", relevant_data);
        const gender = relevant_data.filter(element => element.vocab_id === 'gender_appearance');
        let age = relevant_data.filter(element => element.vocab_id === 'age_appearance');
        if (age.length > 4) {
            age = age.slice(0, 4);
        }
        console.log("age and gender : ", age, gender);
        return {
            age: age,
            gender: gender
        };
    }

    setBox = (boxes) => {
        this.setState(
            {
                boxes: boxes
            }
        )
    }

    setDemographics = (demographics) => {
        this.setState(
            {
                demographics: demographics
            }
        )
        console.log(this.state.demographics);
    }

    render() {
        return (
            <div>
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonClick={this.onButtonClick}
                    infoToDetect='face(s) !' />
                <div>
                    <div className="centerImg pa4 br3 shadow-5">
                        <div className="col-sm-6 image-col">
                            <img
                                className='image'
                                id='image'
                                alt=''
                                width='500px'
                                height='auto'
                                src={this.state.imageURL} />
                            {this.state.boxes.map(element => (
                                <div
                                    key={element.bottomRow + element.topRow + element.leftCol + element.rightCol}
                                    className='face-box'
                                    style={{
                                        bottom: element.bottomRow,
                                        top: element.topRow,
                                        right: element.rightCol,
                                        left: element.leftCol
                                    }}>
                                </div>
                            ))}
                        </div>
                        <div className="col-sm-6 details-col">
                            {
                                this.state.demographics.age.length > 0 ?
                                    <section className="model-section">
                                        <ul className="unordered-list">
                                            <li className="model-container-tag-list-column">
                                                <h3>Attribute</h3>
                                                <h3>Probability</h3>
                                            </li>
                                            {this.state.demographics.gender.map(element => (
                                                <li className="model-container-tag-list-item" key={element.id}>
                                                    <span className="predicted-concept-name" title={element.name}>{element.name}</span>
                                                    <span className="predicted-concept-name"
                                                        title={Math.floor(100 * element.value) > 0 ? Math.floor(100 * element.value) + ' %' : '< 1%'}>
                                                        {Math.floor(100 * element.value) > 0 ? Math.floor(100 * element.value) + ' %' : '< 1%'}
                                                    </span>
                                                </li>
                                            ))}

                                        </ul>
                                        <hr></hr>
                                        <ul className="unordered-list">
                                            <li className="model-container-tag-list-column">
                                                <h3>Predicted age</h3>
                                                <h3>Probability</h3>
                                            </li>
                                            {this.state.demographics.age.map(element => (
                                                <li className="model-container-tag-list-item" key={element.id}>
                                                    <span className="predicted-concept-name" title={element.name}>{element.name}</span>
                                                    <span className="predicted-concept-name"
                                                        title={Math.floor(100 * element.value) > 0 ? Math.floor(100 * element.value) + ' %' : '< 1%'}>
                                                        {Math.floor(100 * element.value) > 0 ? Math.floor(100 * element.value) + ' %' : '< 1%'}
                                                    </span>
                                                </li>
                                            ))}

                                        </ul>
                                    </section>
                                    :
                                    <p>
                                       Please use a picture containing a maximum of one face to compute demographics.
                                    </p>

                            }
                        </div>
                    </div>

                </div>
            </div>


        );
    }

};

export default FaceRecognition;