const app = require('./app/app.js');
const mongoose = require('mongoose');

const port = 8080;
const URI_MICHELE = "mongodb+srv://2LM:passwordditest@trentinofind.x1ubooa.mongodb.net/TrentinoFind?retryWrites=true&w=majority";
const URI_LUCA = "mongodb+srv://lucacaccavale:TrentinoFindPassword@cluster0.yusnkyk.mongodb.net/TrentinoFind";

//La seguente istruzione permette di ignorare un warning di mongoose
mongoose.set('strictQuery', true);
var db = mongoose.connect(URI_LUCA, {useNewUrlParser: true, useUnifiedTopology: true})
.then ( () => {

    console.log("Connected to Database");
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });

});
