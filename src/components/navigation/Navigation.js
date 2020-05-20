import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/face">Face</Link></li>
                <li><Link to="/general">General</Link></li>
                <li><Link to="/food">Food</Link></li>
                <li><Link to="/pattern">Patterns</Link></li>
            </ul>

        </nav>
    );
}

export default Navigation;