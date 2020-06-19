import React from "react";
import {connect} from 'react-redux'
import {setPageTitle} from "../../store/actions/common";
import {getNotes, setNoteModal, search, noteToggleAllCompleted} from "../../store/actions/note";
import NotesList from "./NotesList/NotesList";
import NoteModal from "./NoteModal/NoteModal";
import {CSSTransition} from "react-transition-group";
import css from './notes.module.scss';

class Notes extends React.Component {
    componentDidMount() {
        this.props.setPageTitle('Notes');
        this.props.getNotes();
    }

    render() {
        return (
            <div>
                {
                    this.props.noteState.notesAllLoading
                        ? null
                        :
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="searchField">Search</span>
                            </div>
                            <input
                                className={`${css['search-field']} form-control`}
                                placeholder="query..."
                                type="text"
                                onChange={(e) => this.props.search(e.target.value)}
                                value={this.props.searchValue}
                                aria-describedby="searchField"
                            />
                        </div>
                }
                {
                    this.props.noteState.notesAllLoading
                        ? <div className={css['notes-loader']}></div>
                        : this.props.noteState.notes.length
                        ? <NotesList notes={this.props.noteState.notes}></NotesList>
                        : <ul className="list-group" style={{marginBottom: 15}}>
                            <li className="list-group-item" style={{lineHeight: 30 + 'px'}}>
                                No notes!
                            </li>
                        </ul>
                }
                {
                    this.props.noteState.notesAllLoading
                        ? null
                        : <button
                            className="btn btn-primary"
                            onClick={() => {
                                this.props.setNoteModal({
                                    show: true,
                                    id: '',
                                    title: '',
                                    touched: false,
                                    error: '',
                                    action: 'add'
                                });
                            }}
                            style={{marginRight: 15}}
                        >Add note</button>
                }
                {
                    this.props.noteState.notesAllLoading
                        ? null
                        : <button
                            className="btn btn-primary"
                            onClick={() => this.props.noteToggleAllCompleted(!this.props.noteState.showCompleted)}
                        >{this.props.noteState.showCompleted ? 'Hide' : 'Show'} completed</button>
                }
                {
                    <CSSTransition
                        in={this.props.noteState.noteModal.show}
                        timeout={{enter: 200, exit: 0}}
                        classNames={{
                            enter: css['note-modal-enter'],
                            enterActive: css['note-modal-active-enter'],
                        }}
                        unmountOnExit
                        mountOnEnter
                    >
                        <NoteModal></NoteModal>
                    </CSSTransition>
                }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        searchValue: state.note.search,
        noteState: state.note,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setPageTitle: pageTitle => dispatch(setPageTitle(pageTitle)),
        getNotes: () => dispatch(getNotes()),
        setNoteModal: (data) => dispatch(setNoteModal(data)),
        search: data => dispatch(search(data)),
        noteToggleAllCompleted: (data) => dispatch(noteToggleAllCompleted(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes)