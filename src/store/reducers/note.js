import {
    NOTE_GET_ALL_LOADING,
    NOTE_SET_ALL,
    NOTE_SET_FILTERED,
    NOTE_MODAL_SET_DATA,
    NOTE_SET_SEARCH,
} from '../actions/actionTypes';

const initialState = {
    notesAllLoading: true,
    noteModal: {
        id: '',
        title: '',
        action: '',
        show: false,
        touched: false,
        error: ''
    },
    search: '',
    notes: [],
    allNotes: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case NOTE_SET_ALL:
            return {
                ...state, allNotes: action.data
            }
        case NOTE_SET_FILTERED:
            return {
                ...state, notes: action.data
            }
        case NOTE_SET_SEARCH:
            return {
                ...state, search: action.data
            }
        case NOTE_GET_ALL_LOADING:
            return {
                ...state, notesAllLoading: action.data
            }
        case NOTE_MODAL_SET_DATA:
            state.noteModal = {...state.noteModal, ...action.data};
            return {...state};
        default:
            return state;
    }
}