const app = require('./app/app.js');
const mongoose = require('mongoose');

/**
 * https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment#4-listen-on-the-correct-port
 */

const port = 8000;
const URI_MICHELE = "mongodb+srv://2LM:passwordditest@trentinofind.x1ubooa.mongodb.net/TrentinoFind?retryWrites=true&w=majority";
const URI_LUCA = "mongodb+srv://lucacaccavale:TrentinoFindPassword@cluster0.yusnkyk.mongodb.net/TrentinoFind";

var db = mongoose.connect(URI_LUCA, {useNewUrlParser: true, useUnifiedTopology: true})
.then ( () => {

    console.log("Connected to Database");
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    }); 

});
