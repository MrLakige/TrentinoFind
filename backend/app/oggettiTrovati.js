const express = require('express');
const router = express.Router();

const modelloGiocatore = require('./models/schemaGiocatore'); // get our mongoose model
const modelloOggetto = require('./models/schemaOggetto');

class OggettoTrovato{
    constructor(IDgiocatore, IDoggetto, codiceDiValidazione){
        this.IDgiocatore = IDgiocatore
        this.IDoggetto = IDoggetto
        this.codiceDiValidazione = codiceDiValidazione
    }
    verificaRiempimentoCampi(){
        if (!this.IDgiocatore || !this.IDoggetto || !this.codiceDiValidazione ){
            return false;
          } else{
            return true;
          }
    }
    async verificaOggettoEsistente(){
        let oggettoDB = await modelloOggetto.findById(this.IDoggetto);
        if(!oggettoDB){ //if null
            return false;
        }else{
            return true;
        }
    }
    async verificaGiocatoreEsistente(){
        let giocatoreDB = await modelloGiocatore.findById(this.IDgiocatore);
        if(!giocatoreDB){ //if null
            return false;
        }else{
            return true;
        }
    }
    async verificaOggettoTrovato(){
        let isValid = true;
        let error = "Undefined";
        if(!this.verificaRiempimentoCampi()){
            error = "Alcuni campi mancano"
            isValid = false
            return {isValid,error};
        }
        if(!await this.verificaOggettoEsistente()){
            error = "ID Oggetto non valido"
            isValid = false
            return {isValid,error};
        }
        if(!await this.verificaGiocatoreEsistente()){
            error = "ID Giocatore non valido"
            isValid = false
            return {isValid,error};
        }
        return {isValid,error};
    }
}



//POST /api/v1/oggettiTrovati
router.post('', async (req, res) => {
    let oTObject = new OggettoTrovato(req.body.giocatore, req.body.oggetto, req.body.codiceDiValidazione);
    
    try{
        //Verifica della correttezza dell'oggetto di richiesta
        let {isValid,error} = await oTObject.verificaOggettoTrovato();
        if(!isValid){ //L'oggetto di richiesta non è corretto
            res.status(400).json(error);
        }else{
            res.status(200).send();
        }
    } catch (error){
        // This catch CastError when giocatoreId cannot be casted to mongoose ObjectId
        res.status(400).json("Formato ID non valido");
    }    
});

module.exports = router;