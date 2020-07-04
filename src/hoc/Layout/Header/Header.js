import React from 'react';
import {NavLink} from 'react-router-dom';
import css from './header.module.scss';
import {connect} from 'react-redux';
import {signOut} from '../../../store/actions/auth';

class Header extends React.Component {
    render() {
        return (
            <header className={css.header}>
                <div className={`container ${css.container}`}>
                    <ul className={`nav`}>
                        <li className={`nav-item`}>
                            <NavLink className={css.navLink} activeClassName={css.active} to={`/`} exact>
                                Notes app
                            </NavLink>
                        </li>
                        <li className={`nav-item`}>
                            <NavLink className={css.navLink} activeClassName={css.active} to={`/about`} exact>
                                About
                            </NavLink>
                        </li>
                        <li className={`nav-item`}>
                            <NavLink className={css.navLink} activeClassName={css.active} to={`/big-pic`} exact>
                                Big pic
                            </NavLink>
                        </li>
                    </ul>
                    <ul className={`nav`}>
                        {this.props.authState.token ? (
                            <>
                                <li className={`nav-item`}>
                                    <span className={css.navText}>Logged in as {this.props.authState.email}</span>
                                </li>
                                <li className={`nav-item`}>
                                    <span className={css.navLink} onClick={() => this.props.signOut()}>
                                        Sign out
                                    </span>
                                </li>
                            </>
                        ) : (
                            <li className={`nav-item`}>
                                <NavLink className={css.navLink} activeClassName={css.active} to={`/auth`} exact>
                                    Auth
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </header>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signOut: () => dispatch(signOut()),
    };
}

function mapStateToProps(state) {
    return {
        authState: state.auth,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
