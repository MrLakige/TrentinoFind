const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const log = require('../../logger');


//Creazione dello schema oggetto
const schemaOggetto = new Schema({
    idGiocatore: String,
	  location: String,
    title: String,
    description: String, 
    dimension: String,
    difficulty: String,
    codiceDiValidazione: String,
    validated: Boolean
    /**
     * Commentati questi campi dello schema, in quanto verranno aggiunti
     * quando verranno implementate le user story che li richiedono
     */
    //validated: Boolean,
    //comments: String,
});

//Creazione del modello mongoose, con il quale interagire col database
const modelloOggetto = mongoose.model('Oggetto', schemaOggetto);

modelloOggetto.createCollection().then(function(collection) {
  //console.log('Collection Oggetto is created!');
  log.event('Collection Oggetto is created!');
});

module.exports = modelloOggetto;