//this file create a state that can be accessed by every components

import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {

  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)


  // fetch/get all notes
  const getNotes = async () => {
    // API call to getNotes 
    console.log("Going to fetch all notes")
    const response = await fetch(`${host}/api/notes/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      })

    const allFetchedNotes = await response.json();
    // console.log(await response.json())
    setNotes(allFetchedNotes)
  }


  // Add a Note
  const addNote = async (title, description, tag) => {
    // API call to addnote 
    console.log("Going to add notes")
    const response = await fetch(`${host}/api/notes/addnote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }), // {{title:title, description:description, tag:tag}}
      })

    // console.log(await response.json())
    const newAddedNote = await response.json()
    setNotes(notes.concat(newAddedNote))

  }


  // Edit a Note
  const editNote = async (id, title, description, tag) => {

    //API call for editNote
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      })

    console.log(await response.json())

    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title
        newNotes[i].description = description
        newNotes[i].tag = tag
      }
    }
    setNotes(newNotes)
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API call to deleteNotes 
    console.log("Going to delete note whose id is" + id)
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      })
    const updatedNotesAfterDeleting = notes.filter((note) => { return note._id !== id })
    setNotes(updatedNotesAfterDeleting)
    console.log(await response.json())

  }


  //show alert messages when needed
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }




  return (

    // value={{state:state, updateStateS1;updateStateS1}}
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes, alert, setAlert, showAlert }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState


