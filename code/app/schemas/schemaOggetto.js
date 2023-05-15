const mongoose = require('mongoose');
exports.user = new mongoose.Schema({
    location: String,
    idObject: String,
    description:String,   
    validated: Boolean,
    comments: String,
    phone: String,
    type: String,
});