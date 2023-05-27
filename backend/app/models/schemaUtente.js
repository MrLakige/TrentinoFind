const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaUtente = new Schema({
    email: String,
    password: String,
    ruolo: {
        type: String,
        enum:['Giocatore','Moderatore', 'Amministratore'],
        default: 'Giocatore'
    }
});

//Creazione del modello mongoose, con il quale interagire col database
const modelloUtente = mongoose.model('Utente', schemaUtente);

modelloUtente.createCollection().then(function(collection) {
  console.log('Collection Utente is created!');
});

module.exports = modelloUtente;
