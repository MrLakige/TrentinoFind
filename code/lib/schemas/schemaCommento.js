const mongoose = require('mongoose');
exports.user = new mongoose.Schema({
    idPlayer: String,
    idObject: String,
    date: Date,
    comment: String
});