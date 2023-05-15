var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Giocatore', new Schema({ 
	email: String,
    firstname: String,
    lastname: String,
    age: String,
    phone: String,
}));