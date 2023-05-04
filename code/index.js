const app = require('./lib/app.js');
const mongoose = require('mongoose');

const port= process.env.PORT || 8080;


//app.locals.db = mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})

const username = '2LM';
mongoose.connect('mongodb+srv://2LM:passwordditest@trentinofind.x1ubooa.mongodb.net/?retryWrites=true&w=majority')
.then ( () => {
        
        console.log("Connected to Database");
        
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
        
    });

