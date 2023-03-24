//this file create a state that can be accessed by every components

import React, { useState } from 'react'
import NoteContext from './noteContext'


const NoteState = (props) => {

  const notesInitial = [
    {
      "_id": "641a9d522c96d9fe4c2b8301",
      "user": "641a9c6befcb9a46a02982c9",
      "title": "demo",
      "description": "demo at 5",
      "tag": "personal",
      "date": "2023-03-22T06:16:50.892Z",
      "__v": 0
    },
    {
      "_id": "641c0b68c765bd294b8bc0f5",
      "user": "641a9c6befcb9a46a02982c9",
      "title": "Cricket Match @ Lords",
      "description": "today at 9 am",
      "tag": "personal",
      "date": "2023-03-23T08:18:48.912Z",
      "__v": 0
    },
    {
      "_id": "641c1a3657a0f906c38d57d9s",
      "user": "641a9c6befcb9a46a02982c9",
      "title": "football Match @ Lords",
      "description": "today at 5 am",
      "tag": "personal",
      "date": "2023-03-23T09:21:58.695Z",
      "__v": 0
    },
    {
      "_id": "641c0b68c765bd294b8bc0f5s",
      "user": "641a9c6befcb9a46a02982c9",
      "title": "Cricket Match @ Lords",
      "description": "today at 9 am",
      "tag": "personal",
      "date": "2023-03-23T08:18:48.912Z",
      "__v": 0
    },
    {
      "_id": "641c0b68c765bd294b8bec0f5s",
      "user": "641a9c6befcb9a46a02982c9",
      "title": "Cricket Match @ Lords",
      "description": "today at 9 am",
      "tag": "personal",
      "date": "2023-03-23T08:18:48.912Z",
      "__v": 0
    },
    {
      "_id": "641c0b68c765bd294b8bc0f5e",
      "user": "641a9c6befcb9a46a02982c9",
      "title": "Cricket Match @ Lords",
      "description": "today at 9 am",
      "tag": "personal",
      "date": "2023-03-23T08:18:48.912Z",
      "__v": 0
    },
    {
      "_id": "641c0b68c765bd2s94b8bc0f5",
      "user": "641a9c6befcb9a46a02982c9",
      "title": "Cricket Match @ Lords",
      "description": "today at 9 am",
      "tag": "personal",
      "date": "2023-03-23T08:18:48.912Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesInitial)

  // Add a Note
  const addNote = (title, description, tag) => {

    // API call to addnote 
    console.log("Going to add motes")

    const note = {
      "_id": "641c0b68c765bd2s94b8bc0f5",
      "user": "641a9c6befcb9a46a02982c9",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-03-23T08:18:48.912Z",
      "__v": 0
    }
    setNotes(notes.concat(note))


  }
  // Edit a Note
  const editNote = (id, title, description, tag) => {

    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title
        element.description = description
        element.tag = tag
      }
    }
  }

  // Delete a Note
  const deleteNote = (id) => {

    console.log("Going to delete note whose id is" + id)
    const updatedNotesAfterDeleting = notes.filter((note) => { return note._id !== id })
    setNotes(updatedNotesAfterDeleting)
  }

  return (

    // value={{state:state, updateStateS1;updateStateS1}}
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState