import React, { useContext } from 'react'
import noteContext from './context/notes/noteContext'

const NoteItems = (props) => {

    const context = useContext(noteContext)
    const { deleteNote } = context

    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title"> {note.title} </h5>
                        <span className="badge rounded-pill text-bg-primary align-self-center">{note.tag}</span>
                    </div>
                    <p className="card-text"> {note.description} </p>
                    <div className="d-flex flex-row-reverse">
                        <div className="p-2"><i className="fa-solid fa-trash-can" onClick={() => { deleteNote(note._id) }}></i></div>
                        <div className="p-2"><i className="fa-solid fa-pen-to-square" onClick={()=> {updateNote(note)}} ></i></div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NoteItems