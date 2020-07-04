import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import PrivateRoute from './hoc/PrivateRoute/PrivateRoute';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import './style.scss';
import Layout from './hoc/Layout/Layout';
import Notes from './components/Notes/Notes';
import About from './components/About/About';
import BigPic from './components/BigPic/BigPic';
import Auth from './components/Auth/Auth';
import ReactNotification from 'react-notifications-component';

class App extends React.Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>{this.props.common.pageTitle}</title>
                </Helmet>
                <ReactNotification />
                <Layout>
                    <Switch>
                        <Route path={`/about`} exact component={About}></Route>
                        <Route path={`/big-pic`} exact component={BigPic}></Route>
                        <PrivateRoute path={`/auth`} exact component={Auth} condition={!!this.props.authState.token === false} redirect={`/`}></PrivateRoute>
                        <PrivateRoute path={`/`} exact component={Notes} condition={!!this.props.authState.token === true} redirect={`/auth`}></PrivateRoute>
                        <Redirect to={`/`}></Redirect>
                    </Switch>
                </Layout>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        common: state.common,
        authState: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
