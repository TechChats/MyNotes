import React, { useContext, useState } from 'react'
import noteContext from './context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext)
    const { addNote, showAlert } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (event) => {
        event.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
        showAlert("Note added Successfully", "success")

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
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label" >Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label" >Tag</label>
                        <input type="tag" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                    </div>
                    <button disabled={note.title.length===0 || note.description.length===0 || note.tag.length===0} type="submit" className="btn btn-primary" onClick={handleClick} >Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote