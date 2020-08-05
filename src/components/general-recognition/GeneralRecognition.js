import React, { Component } from 'react';
import Clarifai from '../../../node_modules/clarifai';
import ImageLinkForm from "../image-link-form/ImageLinkForm";

class GeneralRecognition extends Component {
    constructor() {
        super();
        this.state = {
            input: 'https://i.insider.com/5ea6deda5bd7a56cf6782a13?width=1136&format=jpeg',
            imageURL: '',
            concepts: [],
            route: 'general',
            model: 'clarifai'
        }
    }

    componentDidMount() {
        this.onButtonClick();
    }

    onInputChange = (event) => {
        this.setState({
            input: event.target.value
        })
    };

    onChangeModel = (event) => {
        this.setState({
            model: event.target.value
        }, () => {
            this.executeModel()
        }
        );

    };

    executeModel = () => {
        if (this.state.model == 'opencv') {
            const a = fetch(global.config.apiUrl + "getGeneralDetect", {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({
                    imgUrl: this.state.input
                })

            }).then(response => response.json())
                .then(jsondata => this.setState(
                    {
                        concepts: jsondata
                    }
                ))
                .catch(error => console.log(error));
        }
        else {
            this.props.app.models.initModel({ id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40" })
                .then(generalModel => {
                    return generalModel.predict(this.state.input);
                })
                .then(response => {
                    this.setState(
                        {
                            concepts: response['outputs'][0]['data']['concepts']
                        }
                    );
                    console.log("general: ", response['outputs'][0]['data']['concepts']);
                })
        }

    }

    onButtonClick = () => {
        this.setState(
            {
                imageURL: this.state.input
            }
        );
        this.executeModel();

    };

    render() {
        return (
            <div>
                <ImageLinkForm
                    input={this.state.input}
                    onChangeModel={this.onChangeModel}
                    onInputChange={this.onInputChange}
                    onButtonClick={this.onButtonClick}
                    selectedModel={this.state.model}
                    infoToDetect='general things!' />
                <div>
                    <div className="centerImg pa4 br3 shadow-5">
                        <div className="col-sm-6">
                            <img
                                className='image'
                                id='image'
                                alt=''
                                width='500px'
                                height='auto'
                                src={this.state.imageURL} />
                        </div>
                        <div className='col-sm-6 details-col'>
                            <section className="model-section">
                                <ul className="unordered-list">
                                    <li className="model-container-tag-list-column">
                                        <h3>Predicted concept</h3>
                                        <h3>Probability</h3>
                                    </li>
                                    {this.state.concepts.map(element => (
                                        <li className="model-container-tag-list-item" key={element.id}>
                                            <span className="predicted-concept-name" title={element.name}>{element.name}</span>
                                            {this.state.model == 'opencv'
                                                ?
                                                <span className="predicted-concept-name"
                                                    title={element.value > 0 ? element.value + ' %' : '< 1%'}>
                                                    {element.value > 0 ? element.value + ' %' : '< 1%'}
                                                </span>
                                                :
                                                <span className="predicted-concept-name"
                                                    title={Math.floor(100 * element.value) > 0 ? Math.floor(100 * element.value) + ' %' : '< 1%'}>
                                                    {Math.floor(100 * element.value) > 0 ? Math.floor(100 * element.value) + ' %' : '< 1%'}
                                                </span>
                                            }
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

};

export default GeneralRecognition;