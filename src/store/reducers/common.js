import {COMMON_SET_BIG_LOADER, COMMON_SET_TITLE} from '../actions/actionTypes';

const initialState = {
    pageTitle: `React by Igor Tomkovich`,
    bigLoader: false,
    redirect: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case COMMON_SET_TITLE:
            return {
                ...state,
                pageTitle: action.data,
            };
        case COMMON_SET_BIG_LOADER:
            return {
                ...state,
                bigLoader: action.data,
            };
        default:
            return state;
    }
};
