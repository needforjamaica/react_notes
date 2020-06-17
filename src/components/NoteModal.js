import React from "react";
import {connect} from 'react-redux';
import {noteModalSave, resetModal, setNoteModal} from "../store/actions/note";

class NotesModal extends React.Component {

    constructor(props) {
        super(props);
        this.noteTitleField = React.createRef();
    }

    componentDidMount() {
        document.addEventListener("keydown", (e) => this.keydownHandler(e), false);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.noteModal.show && this.props.noteModal.show) {
            this.noteTitleField.current.focus();
        }
    }

    popupClickHandler = (event) => {
        if (event.target.className.match(/modal-container/)) {
            this.props.resetModal();
        }
    }

    keydownHandler(event) {
        if (event.keyCode === 27) {
            if (this.props.noteModal.show) {
                this.props.resetModal();
            }
        }
    }

    formSubmitHandler = (e) => {
        e.preventDefault();
        this.props.setNoteModal({touched: true});
        let error = '';
        if (!this.props.noteModal.title.trim()) {
            error = 'Пожалуйста, введите название заметки';
            this.props.setNoteModal({error: error});
        }
        if (!error) {
            this.props.noteModalSave();
        }
        return false;
    }

    changeHandler = (value, field) => {
        this.props.setNoteModal({
            [field]: value
        });
    }

    render() {
        return (
            <>
                <div
                    className={`modal-container`}
                    onClick={(event) => this.popupClickHandler(event)}
                >
                    <div className="modal-dialog note-modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.noteModal.action.ucfirst()} note</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => this.props.resetModal()}
                                >
                                    <span>×</span>
                                </button>
                            </div>
                            <form onSubmit={(e) => this.formSubmitHandler(e)}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Note text</label>
                                        <input
                                            className="form-control"
                                            value={this.props.noteModal.title}
                                            ref={this.noteTitleField}
                                            onChange={event => this.changeHandler(event.target.value, 'title')}
                                        />
                                    </div>
                                    <input
                                        type="hidden"
                                        value={this.props.noteModal.id}
                                    />
                                    <div className="text-danger error-message">
                                        {
                                            this.props.noteModal.touched
                                                ? this.props.noteModal.error
                                                : ''
                                        }
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={(e) => this.formSubmitHandler(e)}
                                    >
                                        {this.props.noteModal.action === 'add' ? 'Add' : null}
                                        {this.props.noteModal.action === 'edit' ? 'Save' : null}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-warning"
                                        onClick={() => this.props.resetModal()}
                                    >
                                        Close
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        noteModal: state.note.noteModal,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setNoteModal: (data) => dispatch(setNoteModal(data)),
        resetModal: () => dispatch(resetModal()),
        noteModalSave: () => dispatch(noteModalSave()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesModal)