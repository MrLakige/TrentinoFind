/**
 * File che gestisce la connessione con MongoDB
 */

const app = require('./app/app.js');
const mongoose = require('mongoose');

const port = 8080;

const URI = "mongodb+srv://lucacaccavale:TrentinoFindPassword@cluster0.yusnkyk.mongodb.net/TrentinoFind";
var db = mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then ( () => {

    console.log("Connected to Database");
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });

});