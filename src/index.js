import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import iTomPreloader from 'itom-preloader-es6';
import bigPic from './assets/img/big_pic.jpg';

const preloader = new iTomPreloader({
    backgroundColor: `#6f42c1`,
    dotColor: `#ffffff`,
    images: [bigPic],
});
preloader.check();

const composeEnhancers = typeof window === `object` && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById(`root`));
serviceWorker.unregister();
