const express = require('express');
const router = express.Router();
const modelloOggetto = require('./models/schemaOggetto');
const modelloGiocatore = require('./models/schemaGiocatore');

class Oggetto{
    giocatoreDB
    oggettoDB
    constructor(IDgiocatore, location, title, description, dimension, difficulty, codiceDiValidazione){
        this.IDgiocatore = IDgiocatore;
        this.location = location;
        this.title = title;
        this.description = description;
        this.dimension = dimension;
        this.difficulty = difficulty;
        this.codiceDiValidazione = codiceDiValidazione;
    }
    //Verifica che i tutti i campi siano riempiti dall'utente
    verificaRiempimentoCampi(){
        if (!this.IDgiocatore || !this.location || !this.title
            || !this.description || !this.dimension || !this.difficulty 
            || !this.codiceDiValidazione ) return false
        return true
    }
    //Verifica l'esistenza del giocatore
    async verificaGiocatoreEsistente(){
        this.giocatoreDB = await modelloGiocatore.findById(this.IDgiocatore);
        if(!this.giocatoreDB) return false
        return true
    }
    async verificaOggettoInserito(){
        let isValid = true;
        let status = "Undefined";
        if(!this.verificaRiempimentoCampi()){
            status = "Alcuni campi mancano"
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
        let {isValid, status} = await this.verificaOggettoInserito()
        if(!isValid) return {isValid, status};
        /**
         * In tal caso se siamo in condizione di validità il campo
         * this.giocatoreDB è inizializzato
         */
        //istanzio un modello dell'oggetto ricevuto
        this.oggettoDB = new modelloOggetto(this.filtraInformazioniOggettoDB());
        // salvo l'oggetto nel database
        this.oggettoDB = await this.oggettoDB.save();

        let idOggettiNascostiDB = this.giocatoreDB.idOggettiNascosti;
        idOggettiNascostiDB.push(this.oggettoDB.id);
        /**
         * [options.overwrite=false] «Boolean» By default, if you don't include any update operators 
         * in update, Mongoose will wrap update in $set for you. This prevents you from accidentally
         * overwriting the document. This option tells Mongoose to skip adding $set. An alternative 
         * to this would be using Model.findOneAndReplace({ _id: id }, update, options).
         */
        await modelloGiocatore.findByIdAndUpdate(this.giocatoreDB.id, { idOggettiNascosti: idOggettiNascostiDB });
        return {isValid, status};
    }
    //Metodo interno per filtrare le informazioni della classe Oggetto
    //che andranno inserite nel documento del DB della collezione Oggetto
    filtraInformazioniOggettoDB(){
        return {
            idGiocatore: this.IDgiocatore,
            location: this.location,
            title: this.title,
            description: this.description,
            dimension: this.dimension,
            difficulty: this.difficulty,
            codiceDiValidazione: this.codiceDiValidazione
            };
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

//POST /api/v1/oggetti
router.post('', async (req, res) => {
    // istanzio in locale un oggetto in base ai parametri ricevuti
    let oObject = new Oggetto(req.body.IDgiocatore, req.body.location, 
        req.body.title, req.body.description, req.body.dimension, 
        req.body.difficulty, req.body.codiceDiValidazione);
    try{
        console.log(oObject);
        const {isValid, status} = await oObject.inserisciOggettoTrovato();;
        console.log(oObject);
        if (isValid){ 
            let oggettoId = oObject.oggettoDB.id;
            res.location("/api/v1/oggetti/" + oggettoId).status(201).send();
        }else{
            res.status(400).json({
                message: status
            })
        }
    } catch  (error){
        // This catch CastError when giocatoreId cannot be casted to mongoose ObjectId
        res.status(400).json("Formato ID non valido");
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