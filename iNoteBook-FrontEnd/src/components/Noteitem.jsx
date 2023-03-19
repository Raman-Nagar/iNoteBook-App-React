import React, { useContext } from "react";
import { noteContext } from "../context/notes/noteCotext";

const Noteitem = ({ note, updateNote }) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const { title, description, _id } = note;
  return (
    <div className="col-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{title}</h5>
            <div className="d-flex gap-1">
              <i
                className="fa-solid fa-trash"
                onClick={()=>deleteNote(_id)}
                style={{ cursor: "pointer" }}
              ></i>
              <i
                className="fa-solid fa-pen-to-square"
                onClick={()=>updateNote(note)}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
