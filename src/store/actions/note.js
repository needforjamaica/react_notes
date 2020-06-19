import {
    NOTE_GET_ALL_LOADING,
    NOTE_MODAL_SET_DATA,
    NOTE_SET_ALL,
    NOTE_SET_FILTERED,
    NOTE_SET_SEARCH,
    NOTE_SHOW_COMPLETED,
} from "./actionTypes";

import {setBigLoader} from './common'
import axios from 'axios';
import {firstBy} from "thenby";

export const getNotes = () => {
    return async dispatch => {
        try {
            axios.get('https://react-notes-1c0c4.firebaseio.com/note.json').then(response => {
                const notes = [];
                Object.keys(response.data).forEach(key => {
                    notes.push({id: key, title: response.data[key].title, completed: response.data[key].completed});
                })
                dispatch(setNotesLoading(false));
                dispatch(setNotesAll(notes));
            });
        } catch (e) {
            console.log('error', e);
        }
    }
}

export const resetModal = () => {
    return async (dispatch, getState) => {
        dispatch(setNoteModal({
            id: '',
            title: '',
            action: '',
            show: false,
            touched: false,
            error: ''
        }));
    }
}

export const noteModalSave = () => {
    return async (dispatch, getState) => {
        const state = getState().note;
        const noteModal = {...state.noteModal};
        dispatch(resetModal());
        if (noteModal.id) {
            //edit
            let newItem = null;
            let newNotes = [...state.allNotes].map(item => {
                if (item.id === noteModal.id) {
                    item.title = noteModal.title;
                    newItem = {...item};
                }
                return {...item};
            });
            dispatch(setNotesAll(newNotes));
            try {
                axios.put(`https://react-notes-1c0c4.firebaseio.com/note/${newItem.id}.json`, newItem);
            } catch (e) {
                console.log('error ', e);
            }
        } else {
            //add
            dispatch(setBigLoader(true));
            try {
                const newNote = {completed: false, title: noteModal.title};
                const response = await axios.post('https://react-notes-1c0c4.firebaseio.com/note.json', newNote);
                // await new Promise(resolve => setTimeout(resolve, 2000));
                Object.values(response.data).forEach(newId => {
                    newNote.id = newId;
                })
                dispatch(setNotesAll([...state.allNotes, newNote]));
                dispatch(setBigLoader(false));
            } catch (e) {
                console.log('error ', e);
            }
        }
    }
}

export const noteToggle = id => {
    return (dispatch, getState) => {
        const state = getState().note;
        let newItem = null;
        let newNotes = [...state.allNotes].map(item => {
            if (item.id === id) {
                item.completed = !item.completed;
                newItem = {...item};
            }
            return {...item};
        });
        dispatch(setNotesAll(newNotes));
        try {
            axios.put(`https://react-notes-1c0c4.firebaseio.com/note/${newItem.id}.json`, newItem);
        } catch (e) {
            console.log('error', e);
        }
    }
}

export const search = data => {
    return (dispatch, getState) => {
        dispatch({type: NOTE_SET_SEARCH, data});
        dispatch(filterNotes());
    }
}

export const removeNote = id => {
    return (dispatch, getState) => {
        const state = getState().note;
        let newNotes = [...state.allNotes].filter(item => {
            return id !== item.id
        });
        dispatch(setNotesAll(newNotes));
        try {
            axios.delete(`https://react-notes-1c0c4.firebaseio.com/note/${id}.json`);
        } catch (e) {
            console.log('error', e);
        }
    }
}

export const filterNotes = () => {
    return (dispatch, getState) => {
        let filteredNotes = [...getState().note.allNotes];
        const regex = new RegExp(getState().note.search, "i");
        if (getState().note.search.trim()) {
            filteredNotes = filteredNotes.filter(item => {
                return item.title.match(regex);
            });
        }
        filteredNotes = filteredNotes.filter(item => {
            if (getState().note.showCompleted) {
                return true;
            } else {
                return !item.completed;
            }
        });
        dispatch(setNotesFiltered(filteredNotes));
    }
}

export const setNoteModal = data => {
    return {
        type: NOTE_MODAL_SET_DATA,
        data
    }
}

export const setNotesLoading = data => {
    return {
        type: NOTE_GET_ALL_LOADING,
        data
    }
}

export const noteToggleAllCompleted = () => {
    return (dispatch, getState) => {
        let data = !getState().note.showCompleted;
        dispatch({type: NOTE_SHOW_COMPLETED, data})
        dispatch(filterNotes());
    }
}

export const setNotesAll = data => {
    return (dispatch, getState) => {
        dispatch({type: NOTE_SET_ALL, data});
        dispatch(filterNotes());
    }
}

export const setNotesFiltered = data => {
    data.sort(
        firstBy('completed', 'asc')
            .thenBy('title', {ignoreCase: true, direction: "asc"})
    );
    return {
        type: NOTE_SET_FILTERED,
        data
    }
}