const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const crypto = require('crypto');

const app = express();


app.use(express.static('public'));
app.use(bodyParser.json()) 

app.get('/notes', (request, response) => {
    response.sendFile(__dirname + '/public/notes.html');
});

app.get('/api/notes', (request, response) => {
    response.sendFile(__dirname + '/db/db.json');
}
);

app.get('*', (request, response) => {
    response.sendFile(__dirname + '/public/index.html');
}
);

app.post('/api/notes', (request, response) => {
    const notes = JSON.parse(fs.readFileSync(__dirname + '/db/db.json', 'utf8'));
    const newNote = request.body;
    newNote.id = crypto.createHash('sha256').update(JSON.stringify(newNote)).digest('hex');;
    notes.push(newNote);
    fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(notes));
    response.json(notes);
});

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    const notes = JSON.parse(fs.readFileSync(__dirname + '/db/db.json', 'utf8'));
    const newNotes = notes.filter(note => note.id !== id);
    fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(newNotes));
    response.json(newNotes);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});