const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = [];



// app.get('/*', (req, res) => {
//     console.log("made it to index");
//     res.sendFile(path.join(__dirname, '../../index.html'));
// });

app.get('/', (req, res) => {
    console.log("made it to index");
    res.sendFile(path.join(__dirname, '../../index.html'));
});

app.get('/notes', (req, res) => {
    console.log("made it to notes");
    res.sendFile(path.join(__dirname, '../../notes.html'));
});

app.get('/api/notes', (req, res) => {
    console.log("made it to /api/notes:");
    console.log(notes);
    res.json(notes);
});

app.listen(PORT, () => {
    console.log(`Server listening at Port: ${PORT}`)
});