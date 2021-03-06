import React, { Component } from 'react';
import './App.css';

import ImageLinkForm from "./components/image-link-form/ImageLinkForm";
import Rank from "./components/rank/Rank";
import SignIn from './components/Signin/SignIn';
import Register from './components/Register/Register';
import Clarifai from '../node_modules/clarifai';
import HomeComponent from "./components/home-component/HomeComponent";
import FaceRecognition from "./components/face-recognition/FaceRecognition";
import GeneralRecognition from "./components/general-recognition/GeneralRecognition";

class App extends Component {
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

    // componentDidMount() {
    //     fetch('http://localhost:2000')
    //         .then(response => response.json())
    //         .then(console.log)
    // }

    loadUser = (res) => {
        this.setState({
            user: {
                id: res.id,
                email: res.email,
                name: res.name,
                entries: res.entries,
                created: res.created
            }
        })
    };

    onInputChange = (event) => {
        this.setState({
            input: event.target.value
        })
    };

    // onButtonClick = () => {
    //     this.setState(
    //         {
    //             imageURL: this.state.input
    //         }
    //     );
    //     if (this.state.mode === 'face') {
    //         app.models.predict(Clarifai.FACE_DETECT_MODEL,
    //             this.state.input).then(
    //                 // function(response) {
    //                 //     console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    //                 // },
    //                 response => {
    //                     if (response) {
    //                         fetch('http://localhost:2000/image', {
    //                             method: 'PUT',
    //                             headers: { 'Content-Type': 'application/json' },
    //                             body: JSON.stringify({
    //                                 id: this.state.user.id
    //                             })
    //                         })
    //                             .then(response => response.json())
    //                             .then(entries => {
    //                                 this.setState(Object.assign(this.state.user, { entries: entries }))
    //                             })
    //                     }
    //                     this.setBox(this.calculateFaceBox(response))
    //                 })
    //             .catch(error => console.log(error));
    //     }
    //     else {
    //         app.models.initModel({ id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40" })
    //             .then(generalModel => {
    //                 return generalModel.predict(this.state.input);
    //             })
    //             .then(response => {
    //                 console.log("general: ", response['outputs'][0]['data']['concepts']);
    //             })
    //     }

    // };

    calculateFaceBox = (data) => {
        const face = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById("image")
        const width = Number(image.width)
        const height = Number(image.height)
        console.log(data.outputs[0].data.regions[0].region_info.bounding_box)
        return {
            leftCol: face.left_col * width,
            rightCol: width - (face.right_col * width),
            topRow: face.top_row * height,
            bottomRow: height - (face.bottom_row * height)
        }
    }

    setBox = (box) => {
        console.log(box)
        this.setState(
            {
                box: box
            }
        )
    }

    onRouteChange = (routeTo) => {
        if (routeTo === 'signout') {
            this.setState(
                {
                    routeStatus: 'not_logged_in'
                }
            )
        }
        else if (routeTo === 'home') {
            this.setState(
                {
                    routeStatus: 'logged_in'
                }
            )
        }
        this.setState(
            {
                route: routeTo
            }
        )
    }

    render() {
        return (
            <div className="App">
                <HomeComponent />
            </div>
        );
    }
}

export default App;
