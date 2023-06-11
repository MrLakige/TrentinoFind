const express = require('express');
const router = express.Router();

const log = require('../logger');

const modelloGiocatore = require('./models/schemaGiocatore'); // get our mongoose model
const modelloOggetto = require('./models/schemaOggetto');


function filtraOggettoUI(oggettoDB){
    if(!Array.isArray(oggettoDB)){
        oggettoDB = [oggettoDB]
    }
    oggettoDB = oggettoDB.map( (oggettoDB) => {
        return {
            location: oggettoDB.location,
            title: oggettoDB.title,
            description: oggettoDB.description,
            dimension: oggettoDB.dimension,
            difficulty: oggettoDB.difficulty,
            validated: oggettoDB.validated
        };
    });
    return oggettoDB;
}

//GET /api/v1/giocatori/:id/oggettiNascosti
router.get('/:id/oggettiNascosti', async (req, res) => {
    try{
        // Recupero le informazioni del giocatore 
        let giocatoreDB = await modelloGiocatore.findById(req.params.id);
        if(!giocatoreDB){
            res.status(400).json("ID giocatore errato");
            return;
        }
        // Recupero gli oggetti nascosti dal giocatore
        let oggettoDB = await modelloOggetto.find({idGiocatore: req.params.id});
        // Verifico se sono stati recuperati oggetti
        if(!oggettoDB){ 
            res.status(400).json("Non sono ancora presenti oggetti trovati dal giocatore");
        }else{
            res.status(200).json(filtraOggettoUI(oggettoDB));
        }
    } catch (error){
        res.status(400).json("Formato ID non valido");
    }
});

module.exports = router;