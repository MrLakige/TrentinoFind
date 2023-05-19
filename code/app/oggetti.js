const express = require('express');
const router = express.Router();
const modelloOggetto = require('./models/schemaOggetto');

class Oggetto{
    constructor(location, idObject, description, validated, comments);
}



//GET /api/v1/oggetto/{ID}
router.get('/:id', async (req, res) => {
    // cerco l'oggetto in base all'ID mandato
    let oggetto = await modelloOggetto.findById(req.params.id);
    res.status(200).json(oggetto);
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


module.exports = Oggetto;
module.exports = router;