import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import Home from './Home'


function Header() {
    return (
        <div className="header">
        <nav>
            <h1>Lambda Eats</h1>
            <div className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/">Help</NavLink>
            </div>
        </nav>

        <Switch>
            {/* <Route path="/pizza/:itemId">
                <Item items={product} />
            </Route>
            <Route path="/shop">
                <Shop items={product} />
            </Route> */}
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    </div>
    )
}

export default Header
