const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notes = [];

// read in DB file
const readDB = () => {
    fs.readFile(path.join(__dirname, '../../../db/db.json'), "utf8", (err, data) => {
        if (err) {
            console.log("Failed to read DB.");
            return;
        } else {
            console.log("trying to get notes");
            console.log("data: ");
            console.log(data);
            notes = JSON.parse(data);
            console.log("got notes");
        }
        console.log(notes);
        //err ? console.log("Failed to read DB.") : notes = JSON.parse(data);
    });
}

const writeDB = (notes) => {
    fs.writeFile(path.join(__dirname, '../../../db/db.json'), JSON.stringify(notes), err => {
        err ? console.log(err) : console.log("Wrote to DB");
        //console.log(notes);
    });
}

// app.get('/assets/js/tmp.js', (req, res) => {
//     console.log("trying tmp");
//     console.log(path.join(__dirname, '../../assets/js/tmp.js'));
//     res.sendFile(path.join(__dirname, '../../assets/js/tmp.js'));
// });

app.get('/assets/js/index.js', (req, res) => {
    console.log("trying index");
    console.log(path.join(__dirname, '../../assets/js/index.js'));
    res.sendFile(path.join(__dirname, '../../assets/js/index.js'));
});

app.get('/', (req, res) => {
    // console.log("made it to index");
    res.sendFile(path.join(__dirname, '../../index.html'));
});

app.get('/notes', (req, res) => {
    console.log("made it to notes");
    res.sendFile(path.join(__dirname, '../../notes.html'));
});

app.get('/api/notes', (req, res) => {
    console.log("made it to GET /api/notes:");
    readDB();
    console.log(notes);
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = notes.length + 1;
    console.log("made it to POST /api/notes:");
    readDB();
    console.log(notes);
    notes.push(newNote);
    console.log(newNote);
    console.log(notes);
    writeDB(notes);
    console.log("finished writing to DB");
    //res.json(newNote);
    res.json(JSON.parse(JSON.stringify(newNote)));
    console.log("finished sending");
});

app.get('*', (req, res) => {
    // console.log("made it to index");
    res.sendFile(path.join(__dirname, '../../index.html'));
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
    console.log("noteId: "+noteId);
    const found = notes.find((note,index) => {
        if (note.id === noteId) {
            notes.splice(index,1);
            writeDB(notes);
            return true;
        } else {
            return false;
        }
    });
    console.log(found);
    res.json(found);
});

app.listen(PORT, () => {
    console.log(`Server listening at Port: ${PORT}`)
});