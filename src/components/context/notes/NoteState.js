//this file create a state that can be accessed by every components

import React, { useState } from 'react'
import NoteContext from './noteContext'


const NoteState = (props) => {

    const notesInitial =[
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
          "_id": "641c1a3657a0f906c38d57d9",
          "user": "641a9c6befcb9a46a02982c9",
          "title": "football Match @ Lords",
          "description": "today at 5 am",
          "tag": "personal",
          "date": "2023-03-23T09:21:58.695Z",
          "__v": 0
        }
      ]

    const [notes, setNotes] = useState(notesInitial)

    return (

        // value={{state:state, updateStateS1;updateStateS1}}
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState