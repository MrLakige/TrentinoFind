const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creazione dello schema giocatore
const schemaModeratore = new Schema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    age: String,
    phone: String,
});

//Creazione del modello mongoose, con il quale interagire col database
const modelloModeratore = mongoose.model('Moderatore', schemaModeratore);

modelloModeratore.createCollection().then(function(collection) {
  console.log('Collection Moderatore is created!');
});

module.exports = modelloModeratore;