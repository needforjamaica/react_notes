import React from "react";
import {NavLink} from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <header>
                <ul className="nav container">
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            to="/"
                            exact
                        >Notes</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            to="/about"
                            exact
                        >About</NavLink>
                    </li>
                </ul>
            </header>
        )
    }
}

export default Header;