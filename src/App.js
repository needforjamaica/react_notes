import React from "react";
import Layout from "./hoc/layout";
import Notes from "./components/Notes/Notes";
import About from "./components/About";
import './style.scss';
import {Route, Switch} from 'react-router-dom';
import {Helmet} from "react-helmet";
import {connect} from 'react-redux';

class App extends React.Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>{this.props.common.pageTitle}</title>
                </Helmet>
                <Layout>
                    <Switch>
                        <Route path="/about" component={About}></Route>
                        <Route path="/" component={Notes}></Route>
                    </Switch>
                </Layout>
            </>
        )
    }
}


const mapStateToProps = state => {
    return {
        common: state.common
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);