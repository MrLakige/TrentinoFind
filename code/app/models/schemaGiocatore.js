var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schemaGiocatore = new Schema({ 
	email: String,
    password: String,
    firstname: String,
    lastname: String,
    age: String,
    phone: String,
});

const modelloGiocatore = mongoose.model('Giocatore', schemaGiocatore);

modelloGiocatore.createCollection().then(function(collection) {
  console.log('Collection is created!');
});

module.exports = modelloGiocatore;