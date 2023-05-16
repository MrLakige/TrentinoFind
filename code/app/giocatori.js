const express = require('express');
const router = express.Router();
const modelloGiocatore = require('./models/schemaGiocatore'); // get our mongoose model
const emailValidator = require('deep-email-validator');

const Utente = require("./utenti");

class Giocatore extends Utente{
    constructor(email, firstname, lastname, age, phone){
        super(email, firstname, lastname, age, phone);
    }
}


//POST /api/v1/giocatori
router.post('', async (req, res) => {

    let gObject = new Giocatore(req.body.email, req.body.firstname, 
        req.body.lastname, req.body.age, req.body.phone);
    console.log(gObject);

    //Logica di correttezza dati inseriti in fase di registrazione
    if (!gObject.verificaRiempimentoCampi){
        return res.status(400).send({
            message: "Alcuni campi mancano"
        })
    }
    const {valid, reason, validators} = await gObject.verificaEmail();
    if (valid){ 
        let giocatoreDB = new modelloGiocatore(gObject);
        giocatoreDB = await giocatoreDB.save();
        let giocatoreId = giocatoreDB.id;
        console.log('Giocatore saved successfully');
        res.location("/api/v1/giocatori/" + giocatoreId).status(201).send();
    }
    else{ 
        res.status(400).send({
            message: "Please provide a valid email address.",
        });
    }
});

//GET /api/v1/giocatori/{ID}
router.get('/:id', async (req, res) => {
    let giocatoreDB = await modelloGiocatore.findById(req.params.id);
    res.status(200).json(giocatoreDB)
});

//PUT /api/v1/giocatori/{ID}
router.put('/:id', async (req, res) => {
    let giocatoreDB = await modelloGiocatore.findByIdAndUpdate(req.params.id, req.body);
    giocatoreDB = await modelloGiocatore.findById(req.params.id);
    res.status(200).json(giocatoreDB)
});

module.exports = router;