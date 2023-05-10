const mongoose = require('mongoose');
exports.user = new mongoose.Schema({
    namePlayer: String,
    idObject: String,
    description:String,   
    validated: Boolean,
    comments: String,
    phone: String,
    type: String,
});