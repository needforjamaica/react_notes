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
                <p style={{margin: 0}}>Картинка весом 5,2МБ подгруженная прелоадером еще на странице About</p>
                <img src={pic} alt="Big pic" style={{width: 100 + '%', marginBottom: 40}}/>
                <p>Может показаться, что картинка все равно грузилась, потому что она все таки специально тяжелая для примера, и браузеру нужно время для ее рендера, но если сделать оптимизированную картинку, то для пользователя страница загрузится так быстро, как будто он на ней уже не первый раз, хотя это будет первым разом.</p>
                <p>Это удобно использовать для какой-нибудь страницы с большой картинкой вроде кейса в портфолио или рекламного попапа с картинкой, который частенько появляется у тебя на экране белой простыней, и пока картинка не загрузится ты не понимаешь что происходит.</p>
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