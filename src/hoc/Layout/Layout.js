import React from 'react';
import {connect} from 'react-redux';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import css from './layout.module.scss';

class Layout extends React.Component {
    render() {
        return (
            <div className={`wrapper`}>
                <Header></Header>
                <div className={`${css.contentWrapper} container`}>
                    <h1 className={css.h1}>{this.props.common.pageTitle}</h1>
                    {this.props.children}
                </div>
                <Footer></Footer>
                {this.props.common.bigLoader ? (
                    <div className={css.bigLoaderContainer}>
                        <div className={css.loader}></div>
                    </div>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        common: state.common,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
