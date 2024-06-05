const express = require('express');
// express validator is used to check if the entered value are valid or not ...... for maintaining data integrity and consistency 
const { body, validationResult } = require('express-validator');
const route = express.Router();
const Note = require('../Model/Notes');
const User = require('../Model/User');
const fetchUser = require('../middleWare/fetchUser');
const Notes = require('../Model/Notes');

route.post('/addNote', [
    body('title').isLength({ min: 3 }).withMessage('The title length should be a minimun of 3 characters '),
    // body('tag').isLength({ min: 3 }).withMessage('The tag length should be a minimun of 3 characters '),
    body('description').isLength({ min: 3 }).withMessage('The description length should be a minimun of 3 characters '),
], fetchUser, async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'user not found' });
        }
        const { title, tag, description } = req.body;

        Note.create(
            {
                title: title,
                tag: tag,
                description: description,
                user: userId
            }
        ).then(note => {
            res.json(note);
        })
    }
    catch (e) { 
        res.status(401).json({ error: 'Internal Server Error' });
    }
})

route.delete('/deleteNote/:id', fetchUser, async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).json({ error: 'note not found' });
    }
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: 'user not found' });
    }
    if (note.user.toString() !== userId) {
        return res.status(404).json({ error: 'Access Denied' });

    }
    const data = await Note.findByIdAndDelete(req.params.id);
    if (data) {
        res.json({ success: "deleted" })
    }

})
route.put('/updateNote/:id', fetchUser, async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(401).json({ error: 'note not found' });
    }
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: "user not found" });
    }

    if (userId !== note.user.toString()) {
        res.status(404).json({ error: 'access denied' });
    }
    try {
        const newData = {};
        const { title, tag, description } = req.body;
        if (title) {
            newData.title = title;
        }
        if (tag) {

            newData.tag = tag;
        }
        if (description) {
            newData.description = description;
        }

        const updated = await Note.findByIdAndUpdate(req.params.id, { $set: newData }, { new: true });
        if (updated)
        {
            res.json(updated);
        }
        else {
            res.status(401).json({ error: 'can\'t update note' });
        }
    }
    catch (err) {
        res.status(400).json({ error: 'an unexpected error occured' })
    }

})

route.get('/fetchNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        res.status(404).json({ error: 'not found' });
    }
})


route.get('/fetchAllNotes', fetchUser, async (req, res) => {

    try {
        const notes = await Notes.find();
        res.json(notes);
    }

    catch (error) {
        res.status(404).json({ error: 'not found' });
    }

})



module.exports = route;