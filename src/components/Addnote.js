import React, { useContext } from 'react'
import { useState } from 'react';
import noteContext from "../components/context/notes/noteContext"


const Addnote = () => {


    const context=useContext(noteContext);
    const {addNote}=context;

    const [note, setNote]=useState({title:"", description:"", tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""})
    }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
  return (

    <div className="container my-3">
    <h2>Add a Note</h2>
    <form>
    <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input onChange={onChange} type="text" className="form-control" value={note.title} id="title" name="title" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input onChange={onChange} type="text" className="form-control" value={note.description} id="description" name="description"/>
    </div>
    <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input onChange={onChange} type="text" className="form-control" value={note.tag} id="tag" name="tag"/>
    </div>
 
    <button disabled={note.tag.length<5 ||note.description.length<5 } type="submit" onClick={handleClick} className="btn btn-primary">Submit</button>
    </form>
  </div>
  )
}

export default Addnote
