const express = require('express');
const router = express.Router();
const Giocatore = require('./models/schemaGiocatore'); // get our mongoose model

//const { Utente } = require("../schemas/schemaUtente");
/*
class Giocatore extends Utente{
    constructor(email, firstname, lastname, age, phone){
        super(email, firstname, lastname, age, phone);
    }
}*/


//POST /api/v1/giocatori
router.post('', async (req, res) => {

    console.log(req.body);
    
    // let giocatore = new Giocatore(req.body); //EQUIVALENTE
	let giocatore = new Giocatore({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        phone: req.body.phone
    });
    
	giocatore = await giocatore.save();
    let giocatoreId = giocatore.id;

    console.log('Giocatore saved successfully');
    /**
     * La chiamata seguente permette di inviare al client l'id che è generato da 
     * MongoDb, e che permette poi di utilizzare tale id per fare richieste
     * sul path /api/v1/giocatori/{ID}
     */
    res.location("/api/v1/giocatori/" + giocatoreId).status(201).send();
});

//GET /api/v1/giocatori/{ID}
router.get('/:id', async (req, res) => {
    let giocatore = await Giocatore.findById(req.params.id);
    res.status(200).json(giocatore)
});

//PUT /api/v1/giocatori/{ID}
router.put('/:id', async (req, res) => {
    let giocatore = await Giocatore.findByIdAndUpdate(req.params.id, req.body);
    giocatore = await Giocatore.findById(req.params.id);
    res.status(200).json(giocatore)
});

module.exports = router;