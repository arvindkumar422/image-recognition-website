import React, { Component } from 'react';
import Clarifai from '../../../node_modules/clarifai';
import ImageLinkForm from "../image-link-form/ImageLinkForm";
import './PatternRecognition.css';

class PatternRecognition extends Component {
    constructor() {
        super();
        this.state = {
            input: 'https://www.featurepics.com/StockImage/20141121/fractal-spiral-pattern-stock-photo-3357231.jpg',
            imageURL: '',
            pattern: [],
            route: 'pattern'
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

    onChangeModel = () => {
        
    }

    onButtonClick = () => {
        this.setState(
            {
                imageURL: this.state.input
            }
        );
        this.props.app.models.predict(Clarifai.TEXTURES_AND_PATTERNS, this.state.input)
            .then(response => {
                this.setState(
                    {
                        pattern: response['outputs'][0]['data']['concepts']
                    }
                );
            })

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
                    infoToDetect='patterns' />
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
                                    <h3>Predicted pattern</h3>
                                    <h3>Probability</h3>
                                </li>
                                {this.state.pattern.map(element => (
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
                    </div>
                </div>
            </div>
        );
    }

};

export default PatternRecognition;

