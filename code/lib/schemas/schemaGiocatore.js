const mongoose = require('mongoose');
exports.user = new mongoose.Schema({
    idPlayer: String,
    Ranking: Number,
    g,   
    validated: Boolean,
    comments: String,
    phone: String,
    type: String,
});