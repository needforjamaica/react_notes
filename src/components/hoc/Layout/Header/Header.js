import React from "react";
import {NavLink} from 'react-router-dom';
import css from './header.module.scss';

export default () => {
    return (
        <header className={css['header']}>
            <ul className="nav container">
                <li className="nav-item">
                    <NavLink
                        className={css['nav-link']}
                        activeClassName={css['active']}
                        to="/"
                        exact
                    >Notes app</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className={css['nav-link']}
                        activeClassName={css['active']}
                        to="/about"
                        exact
                    >About</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className={css['nav-link']}
                        activeClassName={css['active']}
                        to="/big-pic"
                        exact
                    >Big pic</NavLink>
                </li>
            </ul>
        </header>
    )
}