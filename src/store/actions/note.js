import {NOTE_GET_ALL_LOADING, NOTE_MODAL_SET_DATA, NOTE_SET_ALL, NOTE_SET_FILTERED, NOTE_SET_SEARCH, NOTE_SHOW_COMPLETED} from './actionTypes';

import {setBigLoader} from './common';
import axios from 'axios';
import {firstBy} from 'thenby';

export const getNotes = () => {
    return async (dispatch, getState) => {
        const state = getState();
        axios
            .get(`${process.env.REACT_APP_NOTES_BASE_URL}/note.json?orderBy="userEmail"&equalTo="${state.auth.email.toString()}"`)
            .then((response) => {
                const notes = [];
                if (response.data) {
                    Object.keys(response.data).forEach((key) => {
                        notes.push({
                            id: key,
                            title: response.data[key].title,
                            completed: response.data[key].completed,
                        });
                    });
                }
                dispatch(setNotesLoading(false));
                dispatch(setNotesAll(notes));
            })
            .catch((e) => console.log(`error`, e));
    };
};

export const resetModal = () => {
    return async (dispatch) => {
        dispatch(
            setNoteModal({
                id: ``,
                title: ``,
                show: false,
                touched: false,
                error: ``,
            })
        );
    };
};

export const noteModalSave = () => {
    return async (dispatch, getState) => {
        const state = getState();
        const noteModal = {...state.note.noteModal};
        dispatch(resetModal());
        if (noteModal.id) {
            //edit
            let newItem = null;
            let newItemId = null;
            let newNotes = [...state.note.allNotes].map((item) => {
                if (item.id === noteModal.id) {
                    item.title = noteModal.title;
                    newItem = {...item};
                    newItemId = newItem.id;
                    delete newItem.id;
                }
                return {...item};
            });
            dispatch(setNotesAll(newNotes));
            axios
                .put(`${process.env.REACT_APP_NOTES_BASE_URL}/note/${newItemId}.json`, newItem)
                .then()
                .catch((e) => console.log(`error`, e));
        } else {
            //add
            dispatch(setBigLoader(true));
            try {
                const newNote = {completed: false, title: noteModal.title, userEmail: state.auth.email};
                const response = await axios.post(`${process.env.REACT_APP_NOTES_BASE_URL}/note.json`, newNote);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                Object.values(response.data).forEach((newId) => {
                    newNote.id = newId;
                });
                dispatch(setNotesAll([...state.note.allNotes, newNote]));
                dispatch(setBigLoader(false));
            } catch (e) {
                console.log(`error`, e);
            }
        }
    };
};

export const noteToggle = (id) => {
    return (dispatch, getState) => {
        const state = getState().note;
        let newItem = null;
        let newNotes = [...state.allNotes].map((item) => {
            if (item.id === id) {
                item.completed = !item.completed;
                newItem = {...item};
            }
            return {...item};
        });
        dispatch(setNotesAll(newNotes));
        axios
            .put(`${process.env.REACT_APP_NOTES_BASE_URL}/note/${newItem.id}.json`, newItem)
            .then()
            .catch((e) => console.log(`error`, e));
    };
};

export const search = (data) => {
    return (dispatch) => {
        dispatch({type: NOTE_SET_SEARCH, data});
        dispatch(filterNotes());
    };
};

export const removeNote = (id) => {
    return (dispatch, getState) => {
        const state = getState().note;
        let newNotes = [...state.allNotes].filter((item) => {
            return id !== item.id;
        });
        dispatch(setNotesAll(newNotes));
        axios
            .delete(`${process.env.REACT_APP_NOTES_BASE_URL}/note/${id}.json`)
            .then()
            .catch((e) => console.log(`error`, e));
    };
};

export const filterNotes = () => {
    return (dispatch, getState) => {
        let filteredNotes = [...getState().note.allNotes];
        const regex = new RegExp(getState().note.search, `i`);
        if (getState().note.search.trim()) {
            filteredNotes = filteredNotes.filter((item) => {
                return item.title.match(regex);
            });
        }
        filteredNotes = filteredNotes.filter((item) => {
            if (getState().note.showCompleted) {
                return true;
            } else {
                return !item.completed;
            }
        });
        dispatch(setNotesFiltered(filteredNotes));
    };
};

export const setNoteModal = (data) => {
    return {
        type: NOTE_MODAL_SET_DATA,
        data,
    };
};

export const setNotesLoading = (data) => {
    return {
        type: NOTE_GET_ALL_LOADING,
        data,
    };
};

export const noteToggleAllCompleted = () => {
    return (dispatch, getState) => {
        let data = !getState().note.showCompleted;
        dispatch({type: NOTE_SHOW_COMPLETED, data});
        dispatch(filterNotes());
    };
};

export const setNotesAll = (data) => {
    return (dispatch) => {
        dispatch({type: NOTE_SET_ALL, data});
        dispatch(filterNotes());
    };
};

export const setNotesFiltered = (data) => {
    data.sort(
        firstBy(`completed`, `asc`).thenBy(`title`, {
            ignoreCase: true,
            direction: `asc`,
        })
    );
    return {
        type: NOTE_SET_FILTERED,
        data,
    };
};
