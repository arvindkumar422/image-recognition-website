import React, { Component } from 'react';
import './HomeComponent.css'
import Particles from 'react-particles-js';
import Navigation from '../navigation/Navigation'
import Logo from "../logo/Logo";
import Clarifai from '../../../node_modules/clarifai';
import FaceRecognition from "../face-recognition/FaceRecognition";
import GeneralRecognition from "../general-recognition/GeneralRecognition";
import FoodRecognition from "../food-recognition/FoodRecognition";
import PatternRecognition from "../pattern-recognition/PatternRecognition";

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OptionPills from '../option-pills/OptionPills';

let app = new Clarifai.App({
    apiKey: "bd8b930f738e465e9597ee9b8026ffe1"
});

const particlesJson = {
    particles: {
        number: {
            value: 70,
            density: {
                enable: true,
                value_area: 800
            }
        }

    }
};

class HomeComponent extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageURL: '',
            box: {},
            concepts: [],
            route: 'home',
            routeStatus: 'logged_in',
            user: {
                id: '',
                email: '',
                name: '',
                entries: 0,
                created: ''
            },
            mode: 'face'
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
        if (this.state.mode === 'face') {
            app.models.predict(Clarifai.FACE_DETECT_MODEL,
                this.state.input).then(
                    // function(response) {
                    //     console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
                    // },
                    response => {
                        // if (response) {
                        //     fetch('http://localhost:2000/image', {
                        //         method: 'PUT',
                        //         headers: { 'Content-Type': 'application/json' },
                        //         body: JSON.stringify({
                        //             id: this.state.user.id
                        //         })
                        //     })
                        //         .then(response => response.json())
                        //         .then(entries => {
                        //             this.setState(Object.assign(this.state.user, { entries: entries }))
                        //         })
                        // }
                        this.setBox(this.calculateFaceBox(response))
                    })
                .catch(error => console.log(error));
        }
        else {
            app.models.initModel({ id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40" })
                .then(generalModel => {
                    return generalModel.predict(this.state.input);
                })
                .then(response => {
                    console.log("general: ", response['outputs'][0]['data']['concepts']);
                })
        }

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
                <Particles className='particles' params={particlesJson} />
                <Router>
                    <Navigation />
                    <OptionPills />
                    <div>
                        <Route
                            exact path="/"
                            component={Logo} />
                        <Route
                            path='/face'
                            render={(props) => <FaceRecognition {...props}
                                app={app} />}
                        />
                        <Route
                            path='/general'
                            render={(props) => <GeneralRecognition {...props}
                                app={app} />}
                        />
                        <Route
                            path='/food'
                            render={(props) => <FoodRecognition {...props}
                                app={app} />}
                        />
                        <Route
                            path='/pattern'
                            render={(props) => <PatternRecognition {...props}
                                app={app} />}
                        />
                    </div>
                </Router>
            </div>
        )
    }

};

export default HomeComponent;