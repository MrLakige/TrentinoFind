const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const log = require('../../logger');

//Creazione dello schema commento
const schemaCommento = new Schema({
    idGiocatore: String,
    idOggetto: String,
    data: Date,
    testo: String
});

//Creazione del modello mongoose, con il quale interagire col database
const modelloCommento = mongoose.model('Commento', schemaCommento);

modelloCommento.createCollection().then(function(collection) {
  //console.log('Collection Commento is created!');
  log.event('Collection Commento is created!');
});

module.exports = modelloCommento;