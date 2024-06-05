import React from 'react';
import noteContext from "../Context/notecontext";
import { useContext, useEffect } from "react";
import NoteCard from "./NoteCard";


export default function FetchNotes() {
    const { Notes , fetchNotes } = useContext(noteContext);
    useEffect(() => {
    fetchNotes();
      console.log(Notes);
      // eslint-disable-next-line 
    }, [])
  return (
    <div>
      {
        Notes.map(
          (note) => {
            return <NoteCard note={note} key={note._id} />
          }
        )
      }
    </div>
  )
}
