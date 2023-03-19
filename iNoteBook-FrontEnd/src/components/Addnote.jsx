import React, { useContext, useState } from "react";
import { noteContext } from "../context/notes/noteCotext";

const Addnote = ({showAlert}) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note);
    showAlert("Note Added successfully", "success")
    setNote({ title: "", description: "", tag: "" });
  };
  return (
    <>
      <div className="container my-5">
        <h1>Add a Note</h1>
        <form onSubmit={handleSubmit}>
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

          <button
            type="submit"
            disabled={note.title.length < 5 || note.description.length < 5}
            className="btn btn-primary"
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default Addnote;
