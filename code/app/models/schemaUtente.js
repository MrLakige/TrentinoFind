const mongoose = require('mongoose');
exports.user = new mongoose.Schema({
    email: String,
    firstname: String,
    lastname:String,   
    age: Number,
    phone: String,
});