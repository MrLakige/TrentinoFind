const mongoose = require('mongoose');
const user = new mongoose.Schema({
    fistname: String,
    lastname:String,
    age: Number,
    passwordHash: String,
    email: String,
    phone: String,
    type: String,
});