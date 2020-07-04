import {combineReducers} from 'redux';
import note from './note';
import common from "./common";
import auth from './auth';

export default combineReducers({
    note: note,
    common: common,
    auth: auth
});