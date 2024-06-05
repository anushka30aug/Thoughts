import React, { useContext } from 'react';
import { Deleteicon, Updateicon } from './Icons';
import style from './NoteCard.module.css';
import noteContext from '../Context/notecontext';
export default function NoteCard(props) {
  const { deleteNote, setModal, setEdit } = useContext(noteContext);
  const removeNote = () => {
    deleteNote(props.note._id);
  }

  const editNote = () => {
    setModal(true);
    setEdit({
      title: props.note.title,
      tag: props.note.tag,
      description: props.note.description,
      id: props.note._id
    })

  }

  return (
    <div id={style.notecard}>
      <div id={style.note_title}>
        {props.note.title}
      </div>
      {
        props.note.tag ? <div id={style.note_tag}>
          {props.note.tag}
        </div> : ''
      }

      <div id={style.note_desc}>
        {props.note.description}
      </div>
      <div className={style.icons}>
        <div style={{ maxWidth: '20px', margin: '.5em' }} onClick={removeNote} >
          <Deleteicon />
        </div>
        <div style={{ maxWidth: '20px', margin: '.5em' }} onClick={editNote}>
          <Updateicon />
        </div>
      </div>

    </div>
  );
}
