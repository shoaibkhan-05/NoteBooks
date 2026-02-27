import React from "react";
import { useContext } from "react";
import noteContext from "./context/notes/noteContext";

const NoteItem = ({ note, updateNote}) => {

  const context = useContext(noteContext);
  const{deleteNote}= context;

   

    
  return (
    <div className="col-3 md-3 mb-3">
      <div className="card border border-dark p-3 ">
        <div className="card-body ">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text"> {note.description}</p>
          <p className="card-text"> {note.tag}</p>
          <p className="card-text"> {note.date}</p>
          <div className="align-items-center d-flex ">
             <i className="fa-solid fa-trash-can mx-5" onClick={()=>{deleteNote(note._id)}} ></i>
          <i className="fa-solid fa-pen-to-square mx-5"  onClick={()=>{updateNote(note)}}></i>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
