const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const log = require('../../logger');


const schemaUtente = new Schema({
    email: String,
    password: String,
    firstname : String,
    lastname : String,
    age : Number,
    phone : Number,
    ruolo: String  
});

//Creazione del modello mongoose, con il quale interagire col database
const modelloUtente = mongoose.model('Utente', schemaUtente);

modelloUtente.createCollection().then(function(collection) {
  //console.log('Collection Utente is created!');
  log.event('Collection Utente is created!');
});

module.exports = modelloUtente;