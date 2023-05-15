const express = require('express');
const router = express.Router();
const Giocatore = require('./models/schemaGiocatore'); // get our mongoose model

const { user } = require("../schemas/schemaUtente");

class Giocatore extends user{
    constructor(firstname, lastname, age, passwordHash, email, phone){
        super(firstname, lastname, age, passwordHash, email, phone);
    }
}

router.get('', function(req, res){
    res.send('Richiesta get di /api/v1/giocatori');
});


router.post('', async (req, res) => {
    res.send('Richiesta post di /api/v1/giocatori');

	let giocatore = new Giocatore({
        title: req.body.title //Questo parametro ci arriva dall richiesta http
    });
    
	giocatore = await giocatore.save();
    console.log('Prova 1');
    let giocatoreId = giocatore.id;

    console.log('Giocatore saved successfully');

    /**
     * Link to the newly created resource is returned in the Location header
     * https://www.restapitutorial.com/lessons/httpmethods.html
     */
    //res.location("/api/v1/giocatori/" + giocatoreId).status(201).send();
});


module.exports = router;



router.get('', function(req, res){
    res.send('Richiesta get di /api/v1/giocatori');
});


router.post('', async (req, res) => {
    res.send('Richiesta post di /api/v1/giocatori');

	let giocatore = new Giocatore({
        title: req.body.title //Questo parametro ci arriva dall richiesta http
    });
    
	giocatore = await giocatore.save();
    console.log('Prova 1');
    let giocatoreId = giocatore.id;

    console.log('Giocatore saved successfully');

    /**
     * Link to the newly created resource is returned in the Location header
     * https://www.restapitutorial.com/lessons/httpmethods.html
     */
    //res.location("/api/v1/giocatori/" + giocatoreId).status(201).send();
});


module.exports = router;


module.exports = Giocatore;