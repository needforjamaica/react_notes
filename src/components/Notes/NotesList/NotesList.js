import NoteItem from '../NoteItem/NoteItem';
import React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import css from './notesList.module.scss';

export default (props) => {
    return (
        <div className={`row`} style={{marginBottom: 15 + `px`}}>
            <div className={`col`}>
                <TransitionGroup component={`ul`} className={`list-group`}>
                    {props.notes.map((note) => {
                        return (
                            <CSSTransition
                                timeout={{enter: 400, exit: 600}}
                                key={note.id}
                                classNames={{
                                    enter: css.itemEnter,
                                    enterActive: css.itemEnterActive,
                                    exit: css.itemExit,
                                    exitActive: css.itemExitActive,
                                }}
                            >
                                <NoteItem key={note.id} note={note} className={css.listGroupItem}></NoteItem>
                            </CSSTransition>
                        );
                    })}
                </TransitionGroup>
            </div>
        </div>
    );
};
