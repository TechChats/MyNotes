import React, { useContext } from 'react'
import noteContext from './context/notes/noteContext'
import NoteItems from './NoteItems'

const Notes = () => {
    const context = useContext(noteContext)
    //destructuring context
    const { notes, setNotes } = context

    return (
        <div className="row my-4">
            <h2>Your Notes</h2>
            {notes.map((note) => {
                return <NoteItems note={note} />
            })}
            {/* {console.log(notes)} */}
        </div>
    )
}

export default Notes