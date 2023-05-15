var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schemaGiocatore = new Schema({ 
	email: String,
    firstname: String,
    lastname: String,
    age: String,
    phone: String,
});

const Giocatore = mongoose.model('Giocatore', schemaGiocatore);

Giocatore.createCollection().then(function(collection) {
  console.log('Collection is created!');
});

module.exports = Giocatore;

/*
// set up a mongoose model
module.exports = mongoose.model('Giocatore', new Schema({ 
	email: String,
    firstname: String,
    lastname: String,
    age: String,
    phone: String,
}));
*/