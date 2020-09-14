import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import Home from './Home'
import Form from './Form'

function Header() {
    return (
        <div className="header">
        <nav>
            <h1>Lambda Eats</h1>
            <div className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/help">Help</NavLink>
            </div>
        </nav>


    </div>
    )
}

export default Header
