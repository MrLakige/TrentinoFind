const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creazione dello schema giocatore
const schemaGiocatore = new Schema({
    idOggettiTrovati: Array,
    idOggettiNascosti: Array,
    idUser: ObjectId
});

//Creazione del modello mongoose, con il quale interagire col database
const modelloGiocatore = mongoose.model('Giocatore', schemaGiocatore);

modelloGiocatore.createCollection().then(function(collection) {
  console.log('Collection Giocatore is created!');
});

module.exports = modelloGiocatore;