const express = require('express');
const router = express.Router();
const modelloGiocatore = require('./models/schemaGiocatore'); // get our mongoose model

const Utente = require("./utenti");
class Giocatore extends Utente{
    constructor(email, firstname, lastname, age, phone){
        super(email, firstname, lastname, age, phone);
    }
    /**
     * Questa funzione si occupa di verificare se all'interno
     * del database è già presente un giocatore con la stessa email
     * inserita in fase di registrazione
     */
    async verificaGiocatoreEsistente(){
        let giocatoreDB = await modelloGiocatore.find({ email: this.email }).exec();
        if(!giocatoreDB.length){ //if null
            return false;
        }else{
            return true;
        }
    }
    async verificaRegistrazione(){
        let {isValid, error } = await super.verificaRegistrazione();
        //Se il body è corretto verifico all'interno del database
        //se esiste un account già presente con la stessa email
        if(isValid){
            let thereIsSomeoneElse = await this.verificaGiocatoreEsistente();
            if(thereIsSomeoneElse){
                isValid = false;
                error = "Esiste già un account con questa email"
            }
        }
        return {isValid, error};
    }
}

function filtraInformazioni(giocatoreDB){
    giocatoreDB = [giocatoreDB].map( (giocatoreDB) => {
        return {
            email: giocatoreDB.email,
            firstname: giocatoreDB.firstname,
            lastname: giocatoreDB.lastname,
            age: giocatoreDB.age,
            phone: giocatoreDB.phone,
        };
    });
    return giocatoreDB;
}

//POST /api/v1/giocatori
router.post('', async (req, res) => {

    let gObject = new Giocatore(req.body.email, req.body.firstname, 
        req.body.lastname, req.body.age, req.body.phone);
    
    const {isValid, error} = await gObject.verificaRegistrazione();
    
    if (isValid){ 
        let giocatoreDB = new modelloGiocatore(gObject);
        giocatoreDB = await giocatoreDB.save();
        let giocatoreId = giocatoreDB.id;
        res.location("/api/v1/giocatori/" + giocatoreId).status(201).send();
    }else{
        res.status(400).json({
            message: error
        })
    }
});

//GET /api/v1/giocatori/{ID}
//C'è ancora da aggiungere la verifica della autenticazione
router.get('/:id', async (req, res) => {
    let giocatoreDB = await modelloGiocatore.findById(req.params.id);
    if(!giocatoreDB){ //if null
        res.status(400).json("ID non valido");
    }else{
        res.status(200).json(filtraInformazioni(giocatoreDB));
    }
});

//PUT /api/v1/giocatori/{ID}
//C'è ancora da aggiungere la verifica della autenticazione
router.put('/:id', async (req, res) => {
    let gObject = new Giocatore(req.body.email, req.body.firstname, 
        req.body.lastname, req.body.age, req.body.phone);
    giocatoreDB = await modelloGiocatore.findById(req.params.id);//Esiste un giocatore con quell'ID
    if(!giocatoreDB){ //No, non esiste
        res.status(400).json("ID non valido");
    }else{//Si esiste
        //Verifico prima se posso fare la modifica che è stata mandata
        const {isValid, error} = await gObject.verificaRegistrazione();
        if (isValid){//Si, si può fare
            await modelloGiocatore.findByIdAndUpdate(req.params.id, req.body);
            giocatoreDB = await modelloGiocatore.findById(req.params.id);
            res.status(200).json(filtraInformazioni(giocatoreDB));
        }else{//No, non si può fare
            res.status(400).json({
                message: error
            })
        }
    }
});

module.exports = router;