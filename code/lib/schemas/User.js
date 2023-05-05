const mongoose = require('mongoose');

const { Schema } = mongoose;

const UtenteSchema = new Schema({
    id: Int,
    fistname: String, // String is shorthand for {type: String}
    lastname: String,
    age: Number,
    passwordHash: String,
    email: String,
    phone: Number,
    type: String
});