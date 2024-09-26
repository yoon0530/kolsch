import React, { useContext, useEffect, useState } from 'react'
import noteContext from "../components/context/notes/noteContext"
import Noteitem from "./Noteitem"
import Addnote from './Addnote'
import { useRef } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


    const Notes = () => {
        const context=useContext(noteContext);
        const {notes, getNotes, editNote}=context;
        let history=useHistory();
        useEffect(()=>{
            if(localStorage.getItem('token')){
                getNotes()
            }
            else{
                history.push("/login");
            }
            //eslint-disable-next-line
        }, [])
  
        const ref = useRef(null)
        const refClose = useRef(null)
        const [note, setNote]=useState({id:"", etitle:"", edescription:"", etag:""})


        const updateNote=(currentNote)=>{
            ref.current.click();
            setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag } )
        }



        const handleClick=(e)=>{
            editNote(note.id, note.etitle, note.edescription, note.etag)
            refClose.current.click();
        }
    
        const onChange=(e)=>{
            setNote({...note, [e.target.name]:e.target.value})
        }

  return (
      <>
    <Addnote/>
        <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                    <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input onChange={onChange} type="text" value={note.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input onChange={onChange} value={note.edescription}  type="text" className="form-control" id="edescription" name="edescription"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input onChange={onChange} type="text" value={note.etag}  className="form-control" id="etag" name="etag"/>
                    </div>
                    </form>      
                  </div>
            <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.etag.length<5 ||note.edescription.length<5 } onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
            </div>
        </div>
        </div>
    <div className="row my-3">
        <h2>Your Notes</h2>  
            <div className="container">
                {notes.length===0 && 'No notes to display'}
            </div>
    	  {notes.map((note)=>{
          return <Noteitem key={note._id} note={note} updateNote={updateNote} />       
        })}
        </div>  
        </>
  ) 
}

export default Notes
