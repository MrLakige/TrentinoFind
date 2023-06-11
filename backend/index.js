const app = require('./app/app.js');
const mongoose = require('mongoose');
const log=require('./logger.js');

const port = 8080;
const URI_MICHELE = "mongodb+srv://2LM:passwordditest@trentinofind.x1ubooa.mongodb.net/TrentinoFind?retryWrites=true&w=majority";
const URI_LUCA = "mongodb+srv://lucacaccavale:TrentinoFindPassword@cluster0.yusnkyk.mongodb.net/TrentinoFind";

log.init();
//La seguente istruzione permette di ignorare un warning di mongoose
mongoose.set('strictQuery', true);
//var db = mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
var db = mongoose.connect(URI_LUCA, {useNewUrlParser: true, useUnifiedTopology: true})
.then ( () => {

    //console.log("Connected to Database");
    log.event("Connected to Database");
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        log.event(`Server listening on port ${port}`);
    });

});
