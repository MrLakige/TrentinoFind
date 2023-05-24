const express = require('express');
const app = express();
const path = require('path');


//Routing://
const giocatori = require('./giocatori.js');
const oggetti = require('./oggetti.js');
const oggettiTrovati = require('./oggettiTrovati.js');
const authentication = require('./authentication.js');
//const tokenChecker = require('./tokenChecker.js');


app.use(express.json());// parsing middelware json file
app.use(express.urlencoded({ extended: true }));


/**
 * Serve front-end static files
 
ci servirà più avanti
const FRONTEND = process.env.FRONTEND || Path.join( __dirname, '..', 'node_modules', 'easylibvue', 'dist' );
app.use('/EasyLibApp/', express.static( FRONTEND ));
*/

// uso il contenuto di static, ovvero una semplice interfaccia 
app.use('/', express.static('static')); // expose also this folder

// app.use('api/v1/utente', utente);
app.use('/api/v1/giocatori', giocatori);
app.use('/api/v1/oggetti', oggetti);
app.use('/api/v1/oggettiTrovati', oggettiTrovati);

// authenication:
app.use('/api/v1/authentication', authentication);

app.use((req,res,next) => {
    console.log(req.method + ' ' + req.url)
    next()
})

app.get('/login', (req, res)=>{
    res.send(path.basename('../static/login.html'));
});

// Default 404 handler 
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;