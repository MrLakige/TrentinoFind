const express = require('express');
const router = express.Router();
const modelloGiocatore = require('./models/schemaGiocatore'); // get our mongoose model

const Utente = require("./utenti");

class Giocatore extends Utente{
    constructor(email, firstname, lastname, age, phone){
        super(email, firstname, lastname, age, phone);
    }
}


//POST /api/v1/giocatori
router.post('', async (req, res) => {

    console.log(req.body);
    let gObject = new Giocatore(req.body.email, req.body.firstname, 
        req.body.lastname, req.body.age, req.body.phone);
    console.log(gObject);

    // let giocatore = new modelloGiocatore(req.body); //EQUIVALENTE
    let giocatoreDB = new modelloGiocatore(gObject);
	/*let giocatore = new modelloGiocatore({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        phone: req.body.phone
    });
    */
	giocatoreDB = await giocatoreDB.save();
    let giocatoreId = giocatoreDB.id;

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
    let giocatore = await modelloGiocatore.findById(req.params.id);
    res.status(200).json(giocatore)
});

//PUT /api/v1/giocatori/{ID}
router.put('/:id', async (req, res) => {
    let giocatore = await modelloGiocatore.findByIdAndUpdate(req.params.id, req.body);
    giocatore = await modelloGiocatore.findById(req.params.id);
    res.status(200).json(giocatore)
});

module.exports = router;