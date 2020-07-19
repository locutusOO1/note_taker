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
        // if (err) {
        //     console.log("Failed to read DB.");
        //     return;
        // } else {
        //     notes = JSON.parse(data);
        // }
        //console.log(notes);
        err ? console.log("Failed to read DB.") : notes = JSON.parse(data);
    });
}

const writeDB = (notes) => {
    fs.readFile(path.join(__dirname, '../../../db/db.json'), notes, err => {
        err ? console.log(err) : console.log("Wrote to DB");
        //console.log(notes);
    });
}

app.get('/', (req, res) => {
    console.log("made it to index");
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
    console.log("made it to POST /api/notes:");
    readDB();
    console.log(notes);
    notes.push(req.body);
    console.log(notes);
    //res.json(notes);
});

app.get('*', (req, res) => {
    console.log("made it to index");
    res.sendFile(path.join(__dirname, '../../index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening at Port: ${PORT}`)
});