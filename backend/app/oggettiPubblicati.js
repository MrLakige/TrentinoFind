const express = require('express');
const router = express.Router();

const modelloOggetto = require('./models/schemaOggetto');

class OggettoPubblicato{
    oggettoDB
    constructor(IDoggetto){
        this.IDoggetto = IDoggetto
    }
    verificaRiempimentoCampi(){
        if (!this.IDoggetto) return false
        return true
    }
    async verificaOggettoEsistente(){
        this.oggettoDB = await modelloOggetto.findById(this.IDoggetto);
        if(!this.oggettoDB) return false
        return true
    }
    async verificaOggettoPubblicato(){
        let isValid = true;
        let status = "Undefined";
        if(!this.verificaRiempimentoCampi()){
            status = "Alcuni campi mancano"
            isValid = false
            return {isValid, status};
        }
        if(!await this.verificaOggettoEsistente()){
            status = "ID Oggetto non valido"
            isValid = false
            return {isValid, status};
        }
        return {isValid, status};
    }
    async inserisciOggettoPubblicato(){
        let {isValid, status} = await this.verificaOggettoPubblicato()
        if(!isValid) return {isValid, status};
        /**
         * In tal caso se siamo in condizione di validità il campo
         * this.oggettoDB è stato inizializzato
         */
        //Valido l'oggetto presente nel database
        await modelloOggetto.findByIdAndUpdate(this.IDoggetto, { validated: true });
        return {isValid, status};
    }
}



//POST /api/v1/oggettiPubblicati
router.post('', async (req, res) => {
    // req.body.oggetto è l'ID dell'oggetto in MongoDB
    let oPObject = new OggettoPubblicato(req.body.oggetto);
    
    try{
        let {isValid, status} = await oPObject.inserisciOggettoPubblicato();
        if(!isValid){ 
            res.status(400).json(status);
        }else{
            res.status(201).send("La pubblicazione dell'oggetto è stato effettuata con successo");
        }
    } catch  (error){
        // This catch CastError when giocatoreId cannot be casted to mongoose ObjectId
        res.status(400).json("Formato ID non valido");
    }    
});

module.exports = router;