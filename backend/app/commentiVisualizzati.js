const express = require('express');
const mongoose = require('mongoose');
const modelloCommento = require('./models/schemaCommento');
const log = require('../logger');

const router = express.Router();



//POST /api/v1/commentiVisualizzati
router.post('', async (req, res) => {
    try{
        // Recupero tutti i commenti non visualizzati 
        console.log(req.body.idCommento)
        let commentoDB = await modelloCommento.findById(req.body.idCommento);
        if(!commentoDB){
            res.status(400).json("Non sono presenti commenti da visualizzare");
            return;
        }else{
            await modelloCommento.findByIdAndUpdate(req.body.idCommento, { visualizzato: true });
            res.status(200).json("La visualizzazione del commento è stato effettuata con successo");
        }
    } catch (error){
        res.status(400).json("Formato ID non valido");
    }
});


module.exports = router;