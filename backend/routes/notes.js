const express = require('express')
const router=express.Router();
var fetchuser=require('../middleware/fetchUser');
const note = require('../models/note');
const Note=require('../models/note')
const { body, validationResult } = require('express-validator');


//Route 1: Get all notes using GET "/api/notes/fetchnotes". Login required
router.get('/fetchnotes',fetchuser, async (req, res)=>{
    try {
        
        const notes= await Note.find({user:req.user.id});
        res.json(notes)
    }   catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})
//Route 2: Add a new note using POSt "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


    //Route 3: Add a new note using POSt "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag}=req.body;
try {
    // Create a new object 
    const newNote={}

    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    // Find the note to be updated then autheticate the user and update it
    let note= await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("not found");
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed");
    }
    note =await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
    res.json({note})
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}

})
    //Route 4: Delete note using Delete "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
    // Find the note to be deleted then autheticate the user and delete it
    let note= await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("not found");
    }
    // Allow deletion only if the user owns this note 
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed");
    }
    note =await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted successfully", note:note})
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}

})
module.exports=router