import React from 'react'


const NoteItems = (props) => {
    const { note } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title"> {note.title} </h5>
                    <p className="card-text"> {note.description} </p>
                    <div className="d-flex flex-row-reverse">
                        <div className="p-2"><i className="fa-solid fa-trash-can"></i></div>
                        <div className="p-2"><i className="fa-solid fa-pen-to-square"></i></div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NoteItems