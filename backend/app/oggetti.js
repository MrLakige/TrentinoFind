const express = require('express');
const router = express.Router();
const modelloOggetto = require('./models/schemaOggetto');

class Oggetto{
    constructor(location, title, description, dimension, difficulty){
        location = this.location;
        title = this.title;
        description = this.description;
        dimension = this.dimension;
        difficulty = this.difficulty;
    }
}

function filtraInformazioni(oggettoDB){
    oggettoDB = [oggettoDB].map( (oggettoDB) => {
        return {
            location: oggettoDB.location,
            title: oggettoDB.title,
            description: oggettoDB.description,
            dimension: oggettoDB.dimension,
            difficulty: oggettoDB.difficulty
        };
    });
    return oggettoDB;
}

//GET /api/v1/oggetti/{ID}
router.get('/:id', async (req, res) => {
    // cerco l'oggetto in base all'ID specificato nella richiesta
    let oggettoDB = await modelloOggetto.findById(req.params.id);
    // verifico se è stato trovato l'oggetto
    if(!oggettoDB){ 
        res.status(400).json("ID dell'oggetto non valido");
    }else{
        res.status(200).json(filtraInformazioni(oggettoDB));
    }
});


/*
//POST /api/v1/oggetti
router.post('', async (req, res) => {

    console.log(req.body);
    // istanzio in locale un oggetto in base ai parametri mandati dall'api
    let oObject = new Oggetto(req.body.location, req.body.idObject, req.body.description, req.body.validated, req.body.comments);
    console.log(oObject);
   
    // istanzio un modello dell'oggetto creato
    let oggettoDB = new modelloOggetto(oObject);
    // salvo l'oggetto nel database
	oggettoDB = await oggettoDB.save(); 
    let oggettoId = oggettoDB.id;

    //stampo il risultato ottenuto
    console.log('Oggetto saved successfully');
    res.location("/api/v1/oggetti/" + oggettoId).status(201).send();
});
*/

module.exports = router;