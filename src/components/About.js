import React from "react";
import {connect} from 'react-redux'
import {setPageTitle} from "../store/actions/common";

class Notes extends React.Component {
    componentDidMount() {
        this.props.setPageTitle('About')
    }

    render() {
        return (
            <div>About page</div>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        setPageTitle: pageTitle => dispatch(setPageTitle(pageTitle))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes)