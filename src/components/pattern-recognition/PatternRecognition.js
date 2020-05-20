import React, { Component } from 'react';
import Clarifai from '../../../node_modules/clarifai';
import ImageLinkForm from "../image-link-form/ImageLinkForm";

class PatternRecognition extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageURL: '',
            pattern: [],
            route: 'pattern'
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
                    onInputChange={this.onInputChange}
                    onButtonClick={this.onButtonClick} />
                <div className='absolute mt2'>
                    <div className="row">
                        <div className="col-sm-6">
                            <img
                                className='image'
                                id='image'
                                alt=''
                                width='500px'
                                height='auto'
                                src={this.state.imageURL} />
                        </div>
                        <div className='col-sm-6'>
                            {this.state.pattern.map(element => (
                                <li key={element.id}>
                                    {element.name}
                                </li>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        );
    }

};

export default PatternRecognition;