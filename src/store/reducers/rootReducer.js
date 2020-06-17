import {combineReducers} from 'redux';
import note from './note';
import common from "./common";

export default combineReducers({
    note: note,
    common: common
});