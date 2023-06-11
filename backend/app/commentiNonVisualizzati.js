const express = require('express');
const mongoose = require('mongoose');
const modelloCommento = require('./models/schemaCommento');
const log = require('../logger');

const router = express.Router();

function filtraCommentoUI(commentoDB){
    if(!Array.isArray(commentoDB)){
        commentoDB = [commentoDB]
    }
    commentoDB = commentoDB.map( (commentoDB) => {
        return {
            idCommento: commentoDB.id,
            idGiocatore: commentoDB.idGiocatore,
            idOggetto: commentoDB.idOggetto,
            data: commentoDB.data,
            testo: commentoDB.testo
        };
    });
    return commentoDB;
}

//GET /api/v1/commentiNonVisualizzati
router.get('', async (req, res) => {
    // Recupero tutti i commenti non visualizzati 
    // La funzione find restituisce un array
    let commentoDB = await modelloCommento.find({visualizzato: false});
    if(!commentoDB.length){
        res.status(400).json("Non sono presenti commenti da visualizzare");
        return;
    }else{
        res.status(200).json(filtraCommentoUI(commentoDB));
    }
});

module.exports = router;