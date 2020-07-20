// import code
const express = require('express');
const path = require('path');
const fs = require('fs');

// setup server
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// array to hold note objects
let notes = [];

// read in DB file
const readDB = () => {
    let data = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf8");
    data ? notes = JSON.parse(data) : console.log("Failed to read DB.");
    return notes;
}

// write to DB file
const writeDB = (notes) => fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes), err => {
    if (err) {
        console.log(err);
    }
});

// serve index.html
app.get('/assets/js/index.js', (req, res) => res.sendFile(path.join(__dirname, './public/assets/js/index.js')));

// serve index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// serve notes.html
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// serve array of note objects
app.get('/api/notes', (req, res) => res.json(readDB()));

// add new note object, write to DB, and refresh list of notes
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = new Date().getTime();
    readDB();
    notes.push(newNote);
    writeDB(notes);
    res.json(newNote);
});

// serve index.html
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// delete specific note, update DB file, refresh list of notes
app.delete('/api/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
    const found = notes.find((note,index) => {
        if (note.id === noteId) {
            notes.splice(index,1);
            writeDB(notes);
            return true;
        } else {
            return false;
        }
    });
    res.json(found);
});

// start server listening
app.listen(PORT, () => console.log(`Server listening at Port: ${PORT}`));