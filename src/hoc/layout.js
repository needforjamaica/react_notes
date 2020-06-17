import React from "react";
import {connect} from 'react-redux'
import Header from "../components/Header";
import Footer from "../components/Footer";

class Layout extends React.Component {

    render() {
        return (
            <div className="wrapper">
                <Header></Header>
                <div className="content-wrapper container">
                    <h1>{this.props.common.pageTitle}</h1>
                    {this.props.children}
                </div>
                <Footer></Footer>
                {
                    this.props.common.bigLoader
                    ? <div className="big-loader-container">
                            <div className="loader"></div>
                        </div>
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        common: state.common,
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)