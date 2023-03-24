import React, { useContext, useState } from 'react'
import noteContext from './context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "default" })

    const handleClick = (event) => {
        event.preventDefault();
        addNote(note.title, note.description, note.tag)
    }
    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }

    return (
        <div>
            <div className="container my-4">
                <h2>Add Your Notes</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label" >Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label" >Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label" >Tag</label>
                        <input type="tag" className="form-control" id="tag" name="tag" onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick} >Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote