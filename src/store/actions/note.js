import {
    NOTE_GET_ALL_LOADING,
    NOTE_MODAL_SET_DATA,
    NOTE_SET_ALL,
    NOTE_SET_FILTERED,
    NOTE_SET_SEARCH,
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
                dispatch(filterNotes());
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
            let newNotes = [...state.notes].map(item => {
                if (item.id === noteModal.id) {
                    item.title = noteModal.title;
                    newItem = {...item};
                }
                return {...item};
            });
            dispatch(setNotesAll(newNotes));
            dispatch(filterNotes());
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
                await new Promise(resolve => setTimeout(resolve, 2000));
                Object.values(response.data).forEach(newId => {
                    newNote.id = newId;
                })
                dispatch(setNotesAll([...state.notes, newNote]));
                dispatch(filterNotes());
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
        let newNotes = [...state.notes].map(item => {
            if (item.id === id) {
                item.completed = !item.completed;
                newItem = {...item};
            }
            return {...item};
        });
        dispatch(setNotesAll(newNotes));
        dispatch(filterNotes());
        try {
            axios.put(`https://react-notes-1c0c4.firebaseio.com/note/${newItem.id}.json`, newItem);
        } catch (e) {
            console.log('error', e);
        }
    }
}

export const search = data => {
    return (dispatch, getState) => {
        const regex = new RegExp(data, "i");
        let filteredNotes = [...getState().note.allNotes];
        if (data.trim()) {
            filteredNotes = [...getState().note.allNotes].filter(item => {
                return item.title.match(regex);
            });
        }
        dispatch(setSearch(data));
        dispatch(setNotesFiltered(filteredNotes));
    }
}

export const removeNote = id => {
    return (dispatch, getState) => {
        const state = getState().note;
        let newNotes = [...state.notes].filter(item => {
            return id !== item.id
        });
        dispatch(setNotesAll(newNotes));
        dispatch(filterNotes());
        try {
            axios.delete(`https://react-notes-1c0c4.firebaseio.com/note/${id}.json`);
        } catch (e) {
            console.log('error', e);
        }
    }
}

export const setSearch = data => {
    return {
        type: NOTE_SET_SEARCH,
        data
    }
}

export const filterNotes = () => {
    return (dispatch, getState) => {
        const allNotes = getState().note.allNotes;
        dispatch(setNotesFiltered(allNotes));
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

export const setNotesAll = data => {
    return {
        type: NOTE_SET_ALL,
        data
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