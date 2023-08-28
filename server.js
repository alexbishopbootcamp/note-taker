const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');

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
    notes.push(newNote);
    fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(notes));
    response.json(notes);
});

app.delete('/api/notes/:id', (request, response) => {
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});