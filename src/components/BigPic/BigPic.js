import React from "react";
import {connect} from 'react-redux'
import {setPageTitle} from "../../store/actions/common";
import pic from '../../assets/img/big_pic.jpg'

class Notes extends React.Component {
    componentDidMount() {
        this.props.setPageTitle('Big pic')
    }

    render() {
        return (
            <div>
                <p style={{margin: 0}}>Картинка весом 5,2МБ подгруженная прелоадером</p>
                <img src={pic} alt="Big pic" style={{width: 100 + '%'}}/>
            </div>
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