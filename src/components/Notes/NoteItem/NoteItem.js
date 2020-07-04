import React from 'react';
import {connect} from 'react-redux';
import {noteToggle, removeNote, setNoteModal} from '../../../store/actions/note';

import css from './noteItem.module.scss';

class NoteItem extends React.Component {
    render() {
        return (
            <li className={`${this.props.className} list-group-item ${css.noteBlock} ${this.props.note.completed ? `completed-note` : null}`} style={{borderTop: `1px solid rgba(0, 0, 0, 0.125)`}}>
                <div className={css.checkboxContainer}>
                    <input className={css.formCheckInput} type={`checkbox`} checked={this.props.note.completed} id={`note_item_${this.props.note.id}`} onChange={() => this.props.noteToggle(this.props.note.id)} />
                    <label htmlFor={`note_item_${this.props.note.id}`}>{this.props.note.title}</label>
                </div>
                <div className={css.btnsContainer}>
                    <div
                        className={`btn btn-outline-primary btn-sm ${css.btnEdit}`}
                        onClick={() => {
                            this.props.setNoteModal({
                                id: this.props.note.id,
                                title: this.props.note.title,
                                action: `edit`,
                                show: true,
                                touched: false,
                                error: ``,
                            });
                        }}
                    >
                        Edit
                    </div>
                    <div className={`btn btn-outline-danger btn-sm btn-remove ${css.btnRemove}`} onClick={() => this.props.removeNote(this.props.note.id)}>
                        Remove
                    </div>
                </div>
            </li>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        setNoteModal: (data) => dispatch(setNoteModal(data)),
        removeNote: (id) => dispatch(removeNote(id)),
        noteToggle: (id) => dispatch(noteToggle(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteItem);
