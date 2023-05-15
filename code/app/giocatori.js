const express = require('express');
const router = express.Router();
const Giocatore = require('./models/schemaGiocatore'); // get our mongoose model

//const { user } = require("../schemas/schemaUtente");
/*
class Giocatore extends user{
    constructor(firstname, lastname, age, passwordHash, email, phone){
        super(firstname, lastname, age, passwordHash, email, phone);
    }
}*/


//POST /api/v1/giocatori
router.post('', async (req, res) => {

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

module.exports = router;