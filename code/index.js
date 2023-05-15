const app = require('./app/app.js');
const mongoose = require('mongoose');

/**
 * https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment#4-listen-on-the-correct-port
 */
const port = 8080;


/**
 * Configure mongoose
 */
// mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb+srv://2LM:passwordditest@trentinofind.x1ubooa.mongodb.net/TrentinoFind?retryWrites=true&w=majority')
.then ( () => {
    
    console.log("Connected to Database");
    
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    
});
