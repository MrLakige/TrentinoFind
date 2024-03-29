const express = require('express');
const router = express.Router();

const log = require('../logger');

const modelloGiocatore = require('./models/schemaGiocatore'); // get our mongoose model
const modelloOggetto = require('./models/schemaOggetto');

class OggettoTrovato{
    oggettoDB
    giocatoreDB
    constructor(IDgiocatore, IDoggetto, codiceDiValidazione){
        this.IDgiocatore = IDgiocatore
        this.IDoggetto = IDoggetto
        this.codiceDiValidazione = codiceDiValidazione 
    }
    verificaRiempimentoCampi(){
        if (!this.IDgiocatore || !this.IDoggetto || !this.codiceDiValidazione ) return false
        return true
    }
    async verificaOggettoEsistente(){
        this.oggettoDB = await modelloOggetto.findById(this.IDoggetto);
        if(!this.oggettoDB) return false
        return true
    }
    async verificaGiocatoreEsistente(){
        this.giocatoreDB = await modelloGiocatore.findById(this.IDgiocatore);
        if(!this.giocatoreDB) return false
        return true
    }
    async verificaOggettoTrovato(){
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
        if(!await this.verificaGiocatoreEsistente()){
            status = "ID Giocatore non valido"
            isValid = false
            return {isValid, status};
        }
        return {isValid, status};
    }
    async inserisciOggettoTrovato(){
        let {isValid, status} = await this.verificaOggettoTrovato()
        if(!isValid) return {isValid, status};
        /**
         * In tal caso se siamo in condizione di validità i campi
         * this.giocatoreDB e this.oggettoDB sono inizializzati
         */
        if( this.oggettoDB.validated == false ){
            status = "L'oggetto non è validato"
            isValid = false;
            return {isValid, status};
        } 
        if( this.codiceDiValidazione != this.oggettoDB.codiceDiValidazione ){
            status = "Codice di validazione errato"
            isValid = false;
            return {isValid, status};
        } 
        let idOggettiTrovatiDB = this.giocatoreDB.idOggettiTrovati;
        /**
         * Verifico se nell'array è gia presente l'id dell'oggetto
         * che è stato trovato
         */
        
        idOggettiTrovatiDB.forEach(element => {
            if( element == this.IDoggetto){
                status = "Questo oggetto è stato già trovato"
                isValid = false;
            }
        });
        if(!isValid) return {isValid, status};
        idOggettiTrovatiDB.push(this.IDoggetto);
        /**
         * [options.overwrite=false] «Boolean» By default, if you don't include any update operators 
         * in update, Mongoose will wrap update in $set for you. This prevents you from accidentally
         * overwriting the document. This option tells Mongoose to skip adding $set. An alternative 
         * to this would be using Model.findOneAndReplace({ _id: id }, update, options).
         */
        await modelloGiocatore.findByIdAndUpdate(this.IDgiocatore, { idOggettiTrovati: idOggettiTrovatiDB });
        return {isValid, status};
    }
}

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
            difficulty: oggettoDB.difficulty
        };
    });
    return oggettoDB;
}

//POST /api/v1/oggettiTrovati
router.post('', async (req, res) => {
    let oTObject = new OggettoTrovato(req.body.giocatore, req.body.oggetto, req.body.codiceDiValidazione);
    
    try{
        let {isValid, status} = await oTObject.inserisciOggettoTrovato();
        if(!isValid){ 
            res.status(400).json(status);
        }else{
            res.status(201).send("Il ritrovamento è stato inserito con successo");
        }
    } catch  (error){
        log.warning(error);
        // This catch CastError when giocatoreId cannot be casted to mongoose ObjectId
        res.status(400).json("Formato ID non valido");
    }    
});

//GET /api/v1/giocatori/:id/oggettiTrovati
router.get('/:id/oggettiTrovati', async (req, res) => {
    try{
        // Recupero le informazioni del giocatore 
        let giocatoreDB = await modelloGiocatore.findById(req.params.id);
        if(!giocatoreDB){
            res.status(400).json("ID giocatore errato");
            return;
        }
        // Recupero gli id degli oggetti trovati dal giocatore
        let idOggettiTrovatiDB = giocatoreDB.idOggettiTrovati;
        // Recupero le informazioni degli oggetti trovati dal giocatore
        let oggettoDB
        let nOggettiTrovati = idOggettiTrovatiDB.length;
        if(nOggettiTrovati == 1){
            oggettoDB = [await modelloOggetto.findById(idOggettiTrovatiDB[0])]
        }else{
            let i = 0;
            oggettoDB = []
            while( i < lenght){
                oggettoDB.push(await modelloOggetto.findById(idOggettiTrovatiDB[i]))
            }   
        }
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