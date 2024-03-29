const express = require('express');
const mongoose = require('mongoose');
const modelloCommento = require('./models/schemaCommento');
const modelloGiocatore = require('./models/schemaGiocatore'); 
const modelloOggetto = require('./models/schemaOggetto');
const log = require('../logger');

const router = express.Router();

class Commento{
    giocatoreDB
    oggettoDB
    constructor(idGiocatore, idOggetto, data, testo){
        this.idGiocatore = idGiocatore;
        this.idOggetto = idOggetto;
        this.data = data;
        this.testo = testo;
    }
    verificaRiempimentoCampi(){
        if (!this.idGiocatore || !this.idOggetto || !this.data || !this.testo) return false
        return true
    }
    async verificaOggettoEsistente(){
        this.oggettoDB = await modelloOggetto.findById(this.idOggetto);
        if(!this.oggettoDB) return false
        return true
    }
    async verificaGiocatoreEsistente(){
        this.giocatoreDB = await modelloGiocatore.findById(this.idGiocatore);
        if(!this.giocatoreDB) return false
        return true
    }
    async verificaCommento(){
        let isValid = true;
        let status = "Undefined";
        if(!this.verificaRiempimentoCampi()){
            status = "Alcuni campi mancano"
            isValid = false
            return {isValid, status};
        }
        if(!(this.data instanceof Date)){
            status = "Formato data non valido"
            isValid = false
            return {isValid, status};
        }
        if(!await this.verificaOggettoEsistente()){
            status = "ID Oggetto non valido"
            isValid = false
            return {isValid, status};
        }
        if(!await this.verificaGiocatoreEsistente()){
            status = "ID Giocatore non valido"
            isValid = false
            return {isValid, status};
        }
        return {isValid, status};
    }
    async inserisciCommento(){
        let {isValid, status} = await this.verificaCommento()
        if(!isValid) return {isValid, status};
        /**
         * In tal caso se siamo in condizione di validità i campi
         * this.giocatoreDB e this.oggettoDB sono inizializzati
         */
        let commentoDB = new modelloCommento(this.restituisciCommento());
        commentoDB = await commentoDB.save();
        return {isValid, status};
    }
    restituisciCommento(){
        return {
            idGiocatore: this.idGiocatore,
            idOggetto: this.idOggetto,
            data: this.data,
            testo: this.testo,
            visualizzato: false
        }
    }
}

function filtraCommentoUI(commentoDB){
    if(!Array.isArray(commentoDB)){
        commentoDB = [commentoDB]
    }
    commentoDB = commentoDB.map( (commentoDB) => {
        return {
            idGiocatore: commentoDB.idGiocatore,
            idOggetto: commentoDB.idOggetto,
            data: commentoDB.data,
            testo: commentoDB.testo
        };
    });
    return commentoDB;
}


//POST /api/v1/commenti
router.post('', async (req, res) => {

    let cObject = new Commento(req.body.idGiocatore, req.body.idOggetto, req.body.data, req.body.testo);

    try{
        let {isValid, status} = await cObject.inserisciCommento();
        if(!isValid){ 
            res.status(400).json(status);
        }else{
            res.status(201).send("Il commento è stato inserito con successo");
        }
    } catch  (error){
        //console.log(error)
        log.error(error);
        // This catch CastError when giocatoreId cannot be casted to mongoose ObjectId
        res.status(400).json("Formato ID non valido");
    }    
});


//DELETE /api/v1/commenti
router.delete('/:id', async (req, res) => {
    let commentoId = req.params.id;
    //Verifica dell'autorizzazione
    try{
        let commentoDB = await modelloCommento.findByIdAndDelete(commentoId);
        if(!commentoDB){ //Il commento specificato non esiste
            res.status(400).json("ID non valido");
        }else{
            res.status(200).json("Commento cancellato con successo");
        }
    }catch(error){
        // This catch CastError when commentoId cannot be casted to mongoose ObjectId
        log.warning(error);
        res.status(400).json("Formato ID non valido");
    }   
});

//GET /api/v1/oggettiMappa/:id/commenti
router.get('/:id/commenti', async (req, res) => {
    try{
        // Recupero i commenti associato all'id dell'oggetto passato come parametro 
        let commentoDB = await modelloCommento.find({idOggetto: req.params.id});
        if(!commentoDB){
            res.status(400).json("Non sono presenti commenti");
            return;
        }else{
            res.status(200).json(filtraCommentoUI(commentoDB));
        }
    } catch (error){
        res.status(400).json("Formato ID non valido");
    }
});

module.exports = router;