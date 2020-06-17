import NoteItem from "./NoteItem/NoteItem";
import React from "react";
import {connect} from 'react-redux'
import {TransitionGroup, CSSTransition} from "react-transition-group";

class NotesList extends React.Component {
    render() {
        return (
            <div className="row" style={{marginBottom: 15 + 'px'}}>
                <div className="col">
                    <TransitionGroup component={'ul'} className="list-group">
                        {
                            this.props.notes.map(note => {
                                return <CSSTransition
                                    timeout={300}
                                    key={note.id}
                                ><NoteItem key={note.id} note={note}></NoteItem>
                                </CSSTransition>
                            })
                        }
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        notes: state.note.notes
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesList)