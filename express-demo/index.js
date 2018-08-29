const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
app.use(express.json());

let genres = [
    { id: 1, name: 'Rock' },
    { id: 2, name: 'Metal'}
];

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send({"error":'The genre with given id is not found'});
    res.send(genre);
});

app.post('/api/genres', (req, res)=>{
    if(!req.body.name || req.body.name.length < 3) return res.status(400).send({"error":"Name cannot be empty and minimum length should be more than 3."});
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) res.status(404).send('The genre with given id is not found');
    if(!req.body.name || req.body.name.length < 3) return res.status(400).send({"error":"Name cannot be empty and minimum length should be more than 3."});

    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with given id is not found');

    const index = genres.indexOf(genre);
    genres.splice(index,1);

    res.send(genre);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));