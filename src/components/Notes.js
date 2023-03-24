import React, { useContext, useEffect } from 'react'
import AddNote from './AddNote'
import noteContext from './context/notes/noteContext'
import NoteItems from './NoteItems'

const Notes = () => {
    const context = useContext(noteContext)
    //destructuring context
    const { notes, getNotes } = context

    useEffect(() => {
        getNotes()
    }, []) //fetch all notes once when render Notes.js

    return (
        <>
            <AddNote />
            <div className="row my-4">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItems key={note._id} note={note} />
                })}
                {/* {console.log(notes)} */}
            </div>
        </>
    )
}

export default Notes