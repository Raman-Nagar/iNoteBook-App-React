import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { noteContext } from "../context/notes/noteCotext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";

const Notes = ({ showAlert }) => {
  const ref = useRef(null);
  const closeref = useRef(null);
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;

  const navigate = useNavigate();
  const [note, setNote] = useState({
    _id: "",
    title: "",
    description: "",
    tag: "",
  });
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    editNote(note);
    closeref.current.click();
    showAlert("Updated successfully", "success");
  };
  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line
  }, [notes]);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote(currentNote);
  };
  return (
    <>
      <Addnote showAlert={showAlert} />
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={note.title}
                    onChange={handleChange}
                    minLength={3}
                    required
                    className="form-control"
                    id="title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={note.description}
                    onChange={handleChange}
                    minLength={5}
                    required
                    className="form-control"
                    id="description"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    name="tag"
                    value={note.tag}
                    onChange={handleChange}
                    className="form-control"
                    id="tag"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={closeref}
                type="button"
                className="btn btn-secondary d-none"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                type="button"
                disabled={note.title.length < 5 || note.description.length < 5}
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row m-3">
        <h1>Your Notes</h1>
        {notes.length === 0 && (
          <h4 className="container">Please write a Note...</h4>
        )}
        {notes.map((note) => {
          return (
            <Noteitem
              key={note._id}
              updateNote={updateNote}
              note={note}
              showAlert={showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
