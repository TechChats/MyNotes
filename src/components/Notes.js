import React, { useContext, useEffect, useRef, useState } from 'react'
import AddNote from './AddNote'
import noteContext from './context/notes/noteContext'
import NoteItems from './NoteItems'

const Notes = () => {
    const context = useContext(noteContext)
    //destructuring context
    const { notes, getNotes, editNote, showAlert } = context

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, []) //fetch all notes once when render Notes.js

    const ref = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {

        ref.current.click();// here the pop up well enable
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (event) => {
        console.log("Going to update note", note)
        event.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag)
        showAlert("Note Edited Successfully", "success")

    }
    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }


    return (
        <>
            <AddNote />
            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label" >Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label" >Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label" >Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick} data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-4">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && 'No Notes to display Please add your notes'}
                </div>
                {notes.map((note) => {
                    return <NoteItems key={note._id} updateNote={updateNote} note={note} />
                })}
                {/* {console.log(notes)} */}
            </div>
        </>
    )
}

export default Notes