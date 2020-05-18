import React from 'react'
import {Component} from 'react'

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    onEmailChange = (event) => {
        this.setState(
            {
                email: event.target.value
            }
        )
    };

    onPasswordChange = (event) => {
        this.setState(
            {
                password: event.target.value
            }
        )
    };

    onSignIn = () => {
        //console.log(this.state);
        fetch('http://localhost:2000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                                     email: this.state.email,
                                     password: this.state.password
                                 })
        })
            .then(response => response.json())
            .then(res => {
                if (res.id) {
                    this.props.loadUser(res);
                    this.props.onRouteChange('home');
                }
            });

    };

    render() {
        const {onRouteChange} = this.props;
        return (
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6"
                                   htmlFor="email-address">Email</label>
                            <input
                                onChange={this.onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email" name="email-address" id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                onChange={this.onPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password" name="password" id="password"/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            onClick={this.onSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                        <button
                            onClick={() => onRouteChange('register')}
                            className="f6 link dim black db center">Sign up
                        </button>
                    </div>
                </div>
            </main>

        );
    }

}

export default SignIn;