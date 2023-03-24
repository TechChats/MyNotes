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
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxYTljNmJlZmNiOWE0NmEwMjk4MmM5In0sImlhdCI6MTY3OTQ2NTU3OX0.Yr-lk1W_PIVOCrrCMEW0BTMYrB3feal6drAYJC7DL9Y"
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
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxYTljNmJlZmNiOWE0NmEwMjk4MmM5In0sImlhdCI6MTY3OTQ2NTU3OX0.Yr-lk1W_PIVOCrrCMEW0BTMYrB3feal6drAYJC7DL9Y"
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxYTljNmJlZmNiOWE0NmEwMjk4MmM5In0sImlhdCI6MTY3OTQ2NTU3OX0.Yr-lk1W_PIVOCrrCMEW0BTMYrB3feal6drAYJC7DL9Y"
        },
        body: JSON.stringify({ title, description, tag }),
      })

    console.log(response.json())



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
  const deleteNote = async (id) => {
    // API call to deleteNotes 
    console.log("Going to delete note whose id is" + id)
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxYTljNmJlZmNiOWE0NmEwMjk4MmM5In0sImlhdCI6MTY3OTQ2NTU3OX0.Yr-lk1W_PIVOCrrCMEW0BTMYrB3feal6drAYJC7DL9Y"
        }
      })
    const updatedNotesAfterDeleting = notes.filter((note) => { return note._id !== id })
    setNotes(updatedNotesAfterDeleting)
    // console.log(await response.json())

  }


  return (

    // value={{state:state, updateStateS1;updateStateS1}}
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState


