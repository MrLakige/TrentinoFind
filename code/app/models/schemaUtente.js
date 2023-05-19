const mongoose = require('mongoose');
const utenteSchema = new mongoose.Schema({
    email: String,
    firstname: String,
    lastname: String,
    age: Number,
    phone: String,
});

module.exports = mongoose.model('Utente', utenteSchema);
