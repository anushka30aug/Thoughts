import React, { useState } from 'react';
import noteContext from './notecontext';
import toast, { Toaster } from 'react-hot-toast';
const host = process.env.HOST;

function NoteState(props) {
  const [Notes, setNotes] = useState([]);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState({ title: '', tag: '', description: '', id: "" })

  console.log(toast)
  async function fetchNotes() {
    const note = await fetch(`${host}/api/notes/fetchNotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    }
    )
    const data = await note.json();
    setNotes(data);
    console.log(data);
  }


  const addNote = async (title, tag, desc) => {
    const add = { title: title, tag: tag, description: desc };
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(add)
    })
    const data = await response.json();
    if (data.errors) {
      toast.error('error occured')
      return;
    }
    setNotes(Notes.concat(data));
    toast.success('saved !')

  }
  const updateNote = async () => {
    const newNote = JSON.parse(JSON.stringify(Notes));
    for (let i = 0; i < newNote.length; i++) {
      if (edit.id === newNote[i]._id) {
        newNote[i].title = edit.title;
        newNote[i].tag = edit.tag;
        newNote[i].description = edit.description;
        break;
      }
    }
    const add = { title: edit.title, tag: edit.tag, description: edit.description };
    const note = await fetch(`${host}/api/notes/updateNote/${edit.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(add)
    })
    const data = await note.json();
    if (data.error) {
      toast.error("can't update note");

    }
    else {
      toast.success('Updated!')
      setNotes(newNote);
    }


  }
  const deleteNote = async (id) => {
    const newNotes = Notes.filter(notes => notes._id !== id);
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const data = await response.json();
    console.log(data);
    if (!data.success) {
      toast.error('can\'t delete the note');
      return;
    }
    setNotes(newNotes);
    toast.success('Deleted Successfully!')

    // console.log('deleteing note with id ' + id);
  }
  return (
    <noteContext.Provider value={{ Notes, addNote, deleteNote, updateNote, modal, setModal, edit, setEdit, fetchNotes }}>
      <Toaster
        //position="top-center"
       // reverseOrder={false}
      />
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;