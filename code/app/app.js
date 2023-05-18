const express = require('express');
const app = express();
//const path = require('path');


//Routing:
const giocatori = require('./giocatori.js');


app.use(express.json());// parsing middelware json file
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/giocatori', giocatori);





app.use((req,res,next) => {
    console.log(req.method + ' ' + req.url)
    next()
})

// Default 404 handler 
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;