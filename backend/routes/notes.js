const express = require("express");
const router = express.Router();
const fetchUser = require("../middelware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//route1: get loggedin user detsails using GET  "/api/auth/getuser".login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    console.log("Logged in user ID:", req.user.id);
    console.log("Logged in user Role:", req.user.role);
    
    if(req.user.role=== "admin"){
       const notes = await Notes.find();
   return res.json(notes);
    }

    const notes = await Notes.find({ user: req.user.id });
    return res.json(notes);

  } catch (error) {
    res.status(500).json({error:"Internal server error" });
  }
  
});

//route1: add a new notes  "/api/auth/addnote".login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "descreption must be atleast 5 caharacter").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are errors , returns request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNotes = await note.save();
      // const notes = await Notes.find({ user: req.user.id });
      res.send(savedNotes);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(" internals server erorr");
    }
  }
);

//update routes
router.put("/updatenote/:id", fetchUser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;
  //create newnotes
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  let note =  await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("not allowed");
  }
  note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
  res.json({note});
} 
    
 

catch (error) {
      console.error(error.message);
      return res.status(500).send(" internals server erorr");
    }
});



//delete  routes
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  
 try {
    let note =  await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("not allowed");
  }
  note = await Notes.findByIdAndDelete(req.params.id)
  res.status(200).send("Notes deleted successfully ");
 } 
    catch (error) {
      console.error(error.message);
      return res.status(500).send(" internals server erorr");
    }
 

  
});
module.exports = router;
