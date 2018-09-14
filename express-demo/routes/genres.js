const express = require('express');
const router = express.Router();

let genres = [
    { id: 1, name: 'Rock' },
    { id: 2, name: 'Metal'}
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send({"error":'The genre with given id is not found'});
    res.send(genre);
});

router.post('/', (req, res)=>{
    //debug(`req.body.name = ${req.body.name}`); 
    if(!req.body.name || req.body.name.length < 3) return res.status(400).send({"error":"Name cannot be empty and minimum length should be more than 3."});
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) res.status(404).send('The genre with given id is not found');
    if(!req.body.name || req.body.name.length < 3) return res.status(400).send({"error":"Name cannot be empty and minimum length should be more than 3."});

    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with given id is not found');

    const index = genres.indexOf(genre);
    genres.splice(index,1);

    res.send(genre);
});

module.exports = router;