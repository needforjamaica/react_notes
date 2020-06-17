import React from "react";
import {connect} from 'react-redux'
import {setPageTitle} from "../../store/actions/common";
import {getNotes, setNoteModal, search} from "../../store/actions/note";
import NotesList from "../NotesList";
import NoteModal from "../NoteModal";
import {CSSTransition} from "react-transition-group";

class Notes extends React.Component {
    componentDidMount() {
        this.props.setPageTitle('Notes');
        this.props.getNotes();
    }

    render() {
        return (
            <div>
                {
                    this.props.notesAllLoading
                        ? null
                        :
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="searchField">Search</span>
                            </div>
                            <input
                                className="search-field form-control"
                                placeholder="query..."
                                type="text"
                                onChange={(e) => this.props.search(e.target.value)}
                                value={this.props.searchValue}
                                aria-describedby="searchField"
                            />
                        </div>
                }
                {
                    this.props.notesAllLoading
                        ? <div className="notes-loader"></div>
                        : this.props.notes.length
                        ? <NotesList></NotesList>
                        : <div className="no-notes">No notes!</div>
                }
                {
                    this.props.notesAllLoading
                        ? null
                        : <button className="btn btn-primary" onClick={() => {
                            this.props.setNoteModal({
                                show: true,
                                id: '',
                                title: '',
                                touched: false,
                                error: '',
                                action: 'add'
                            });
                        }}>Add note</button>
                }
                {
                    <CSSTransition
                        in={this.props.noteModal.show}
                        timeout={{enter: 200, exit: 0}}
                        classNames="note-modal"
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
        notes: state.note.notes,
        notesAllLoading: state.note.notesAllLoading,
        noteModal: state.note.noteModal,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setPageTitle: pageTitle => dispatch(setPageTitle(pageTitle)),
        getNotes: () => dispatch(getNotes()),
        setNoteModal: (data) => dispatch(setNoteModal(data)),
        search: data => dispatch(search(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes)