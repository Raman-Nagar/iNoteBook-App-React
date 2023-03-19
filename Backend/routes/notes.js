const express = require("express");
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

const router = express.Router();

//Rout:1 Get all the Notes using: GET "/api/notes/fetchallnotes". login require.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Internal server error" });
  }
});

//Rout:2 Add a new Note using: POST "/api/notes/addnote". login require.
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a title min 3 char.").isLength({ min: 3 }),
    body("description", "Enter a desc min 5 char.").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    //if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const note = new Notes({
        user: req.user.id,
        title,
        description,
        tag,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: "Internal server error" });
    }
  }
);

//Rout:3 Update an axistin Note using: PUT "/api/notes/updatenote". login require.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create a new note object
    const newnote = {};
    if (title) {
      newnote["title"] = title;
    }
    if (description) {
      newnote["description"] = description;
    }
    if (tag) {
      newnote["tag"] = tag;
    }
    //Find the Note to be Updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    //Allow updation only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Internal server error" });
  }
});

//Rout:4 Delete an axistin Note using: DELETE "/api/notes/deletenote". login require.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Find the Note to be Deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    //Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Internal server error" });
  }
});

module.exports = router;
