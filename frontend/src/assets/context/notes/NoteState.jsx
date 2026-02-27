import React, { useState } from "react";
import { toast, Bounce, Zoom } from "react-toastify";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:8080";
  const Notes = [];

  const [notes, setNotes] = useState(Notes);

  // get all note
  const getNotes = async () => {
    //todo : Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkzNGY1OTVjOTQ3OTE0N2QyYWU4MjdjIn0sImlhdCI6MTc2NTA4MjkwOH0.JSOPEXzBx1ctHLItXi3dMB7P5Ljl8qjmav_M0sG_kQQ",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // add a note
  const addNote = async (title, description, tag) => {
    //todo : Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkzNGY1OTVjOTQ3OTE0N2QyYWU4MjdjIn0sImlhdCI6MTc2NTA4MjkwOH0.JSOPEXzBx1ctHLItXi3dMB7P5Ljl8qjmav_M0sG_kQQ",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
    setTimeout(() => {
      // notify
      toast.success("Added Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }, 0);
  };

  // delete
  const deleteNote = async (_id) => {
    const c = confirm(" Do you really want to Delete");
    if (c) {
      const response = await fetch(`${host}/api/notes/deletenote/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkzNGY1OTVjOTQ3OTE0N2QyYWU4MjdjIn0sImlhdCI6MTc2NTA4MjkwOH0.JSOPEXzBx1ctHLItXi3dMB7P5Ljl8qjmav_M0sG_kQQ",
        },
      });
      const json = response.text();

      const newNotes = notes.filter((note) => note._id !== _id);
      setNotes(newNotes);
      setTimeout(() => {
        // notify
        toast.warn("Deleted !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
      }, 0);
    }
  };

  /// edit function

  const editNote = async (_id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkzNGY1OTVjOTQ3OTE0N2QyYWU4MjdjIn0sImlhdCI6MTc2NTA4MjkwOH0.JSOPEXzBx1ctHLItXi3dMB7P5Ljl8qjmav_M0sG_kQQ",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === _id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
     setTimeout(() => {
      // notify
      toast.success("Updated Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }, 0);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
