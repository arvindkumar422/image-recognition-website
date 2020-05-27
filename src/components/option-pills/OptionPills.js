import React, { Component } from 'react';
import './OptionPills.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class OptionPills extends Component {

    constructor() {
        super();
        this.state = {
            active: 'home'
        }
    }

    toggleClass = (event) => {
        this.setState(
            {
                active: event
            }
        );
    }


    render() {
        return (
            <div>
                <nav className="nav nav-pills nav-fill centerPills">
                    <Link to="/" className={this.state.active === 'home' ? 'active nav-item nav-link' : 'nav-item nav-link option-item'}
                        onClick={() => this.toggleClass('home')}>Home</Link>
                    <Link to="/face" className={this.state.active === 'face' ? 'active nav-item nav-link' : 'nav-item nav-link option-item'}
                        onClick={() => this.toggleClass('face')}>Face</Link>
                    <Link to="/general" className={this.state.active === 'general' ? 'active nav-item nav-link' : 'nav-item nav-link option-item'}
                        onClick={() => this.toggleClass('general')}>General</Link>
                    <Link to="/food" className={this.state.active === 'food' ? 'active nav-item nav-link' : 'nav-item nav-link option-item'}
                        onClick={() => this.toggleClass('food')}>Food</Link>
                    <Link to="/pattern" className={this.state.active === 'patterns' ? 'active nav-item nav-link' : 'nav-item nav-link option-item'}
                        onClick={() => this.toggleClass('patterns')}>Patterns</Link>
                </nav>
            </div>
        );
    }
}

export default OptionPills;