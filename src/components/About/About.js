import React from "react";
import {connect} from 'react-redux'
import {setPageTitle} from "../../store/actions/common";
import css from './about.module.scss';
import initPreloader from '../../assets/img/init_preloader.png';
import ajax from '../../assets/img/ajax.png';
import cache from '../../assets/img/cache.png';
import structure from '../../assets/img/structure.png';

class Notes extends React.Component {
    componentDidMount() {
        this.props.setPageTitle('About')
    }

    render() {
        return (
            <div>
                <h2>Здравствуйте!</h2>
                <p>Меня зовут Игорь Томкович. Я - фронтэнд рзработчик и это мое тестовое приложение на React. <a href="https://hh.ru/resume/e686aa20ff07886d6b0039ed1f6b504a796d6b" target="_blank" rel="noopener noreferrer">А это - моё резюме</a></p>
                <p>В приложении в миниатюре есть все основные функции: добавление, редактирование, удаление, кнопки фильтрации, функция поиска, прелоадеры, анимации, после открытия попапа поле получает фокус, попап сабмиттится по нажатию клавиши Enter и закрывается по нажатию клавиши Esc. Для хостинга используется firebase cloud hosting, как тестовая база - firebase cloud database.</p>
                <h2>Preloader</h2>
                <p>Во время работы над небольшими коммерческими или своими проектами я часто сталкиваюсь с ситуацией, что для сайта не нарисовано никакого прелодера. Это случается даже с очень крупными проектами.<br/></p>
                <p style={{margin: 0}}>Поскольку я не люблю смотреть на подгрузку шрифтов или картинки главного экрана, я сделал простой прелоадер, который встретил и вас.</p>
                <div className={css['preloader-example-container']}>
                    <div className={css['itom-preloader-spinner']}>
                        <div className={css['itom-preloader-bounce1']}></div>
                        <div className={css['itom-preloader-bounce2']}></div>
                        <div></div>
                    </div>
                </div>
                <p>Мы можем установить цвет фона, цвет точек и время прелоадера прямо из JS.</p>
                <p style={{margin: 0}}>
                    Добавить прелоадер очень легко:<br/>
                    Он выгружен в npm поэтому достаточно подлючить пакет с помощью команды<br/>
                    <b>npm i itom-preloader-es6</b><br/>
                    импортировать стили и инициализировать пакет:
                </p>
                <img className={css['img']} src={initPreloader} alt="init preloader"/>
                <p>Также у прелоадера есть дополнительная функиция, которая позволяеть закэшировать какие-нибудь файлы или картинки. Это может пригодиться чтобы заранее скачать картинку, которая изначально не видна и не будет скачана браузером (картинка на ховер элемента или в попапе, который пока не виден).</p>
                <p>Я добавил эту функцию когда делал портфолио для одного дизайнера, на страницах работ в портфолио были довольно тяжелые картинки кейсов, на загрузку которых было смотреть не очень весело.</p>
                <p>В нашем случае мы добавим в предзагрузку один файл big_pic.jpg, это картринка весом 5,2МБ со страницы Big pic.</p>
                <p style={{margin: 0}}>В момент работы прелоадера для каждого файла из массива [images] будет создан AJAX запрос с особыми заголовками, которые скажут браузеру принудительно закэшировать файл:</p>
                <img className={css['img']} src={ajax} alt="ajax"/>
                <p style={{margin: 0}}>Когда же мы перейдем на страницу Big pic с этой картинкой, то мы увидем ее сразу же без загрузки, а в dev tools мы увидим, что картинка весит всего 181 байт (взята из кэша).</p>
                <img className={css['img']} src={cache} alt="init preloader"/>
                <p>Так и было и на каждой странице работ портфолио, что сделало просмотр приятнее.</p>
                <p>Подробнее про этот пакет можно посмотреть в репозитории <a href="https://www.npmjs.com/package/itom-preloader-es6" target="_blank" rel="noopener noreferrer">NPM</a>, с ссылками на github и codepen.</p>
                <h2>Структура</h2>
                <p style={{margin: 0}}>Проект был создан с помощью CLI create-react-app, eject не проводился. Общая структура проекта выглядит вот так:</p>
                <img className={css['img']} src={structure} alt="structure"/>
                <p><b>assets/img</b> - папка с картинками</p>
                <p><b>components/hoc</b> (higher order components) - папка с лейаутом и всеми частями, которые используются только в нем</p>
                <p><b>components</b> - папка с компонентами контейнерами и их частями. Все компоненты изменяющие стэйт являются классами расширяющими React.Component, компоненты же просто рендерящие данные являются простыми функциональными компонентами, как рекомендовано разработчиками React</p>
                <p><b>store</b> - папка с файлами отвечающую за работу с состоянием приложения (Redux)</p>
                <p><b>store/actions/actionTypes</b> - файл с константами имен экшнов, чтобы удобнее использовать их и не путать названия</p>
                <p><b>store/actions</b> - файлы с экшнами, для манипуляции с данными</p>
                <p><b>store/reducers</b> - файлы редьюсеров для установки нового стэйта</p>
                <p>Подробнее со структурой можно ознакомиться <a href="https://github.com/needforjamaica/react_notes" target="_blank" rel="noopener noreferrer">в репозитории на github</a></p>
                <h2>CSS</h2>
                <p>Все стили заданы через CSS Modules, что делает компоненты независимыми друг от друга, в общем файле только подключение bootstrap 4 и общая keyframe анимация. Все стили написаны с помощью препроцессора SASS, в формате SCSS</p>
                <h2>Серверная часть</h2>
                <p>Вся работа с базой организована через firebase cloud database, запросы на редактирование и удаление идут асинхронно, а на добавление синхронно и добален дополнительный promise с timeout на 1000мс для демонстрации loader'a.</p>
                <p>Хостится приложение также на firebase cloud hosting.</p>
                <p>Для асинхронной работы с базой используется axios, для асинхронной работы со стейтом redux-thunk.</p>
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