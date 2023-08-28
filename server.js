const express = require('express');
const fs = require('fs');

const app = express();


app.use(express.static('public'));

app.get('/notes', (request, response) => {
});

app.get('/api/notes', (request, response) => {
}
);

app.get('*', (request, response) => {
}
);

app.post('/api/notes', (request, response) => {
});

app.delete('/api/notes/:id', (request, response) => {
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});