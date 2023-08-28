const express = require('express');
const fs = require('fs');

const app = express();


app.use(express.static('public'));

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
});

app.delete('/api/notes/:id', (request, response) => {
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});