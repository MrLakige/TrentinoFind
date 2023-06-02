const express = require('express');
const router = express.Router();
const modelloAmministratore = require('./models/schemaGiocatore'); // get our mongoose model
const log = require('../logger');

const Utente = require("./utenti");
class Amministratore extends Utente{
    constructor(email, password, firstname, lastname, age, phone){
        super(email, password, firstname, lastname, age, phone);
    }

}

module.exports = router;


