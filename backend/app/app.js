const express = require('express');
const app = express();
const path = require('path');
const log = require('../logger');

//Routing://
const giocatori = require('./giocatori.js');
const moderatori = require('./moderatori.js');
const oggettiNonValidati = require('./oggettiNonValidati.js');
const oggettiMappa = require('./oggettiMappa.js');
const oggettiTrovati = require('./oggettiTrovati.js');
const oggettiNascosti = require('./oggettiNascosti.js');
const oggettiPubblicati = require('./oggettiPubblicati.js');
const commenti = require('./commenti.js');
const commentiVisualizzati = require('./commentiVisualizzati.js');
const commentiNonVisualizzati = require('./commentiNonVisualizzati.js');
const authentication = require('./authentication.js');
//const tokenChecker = require('./tokenChecker.js');

try {  
    app.use(express.json());// parsing middelware json file
    app.use(express.urlencoded({ extended: true }));


    app.use((req,res,next) => {
        //console.log(req.method + ' ' + req.url);
        log.event(req.method + ' ' + req.url);
        next();
    });

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
    // Per far uso del path GET /api/v1/giocatori/:id/oggettiTrovati
    app.use('/api/v1/giocatori', oggettiTrovati);
    // Per far uso del path GET /api/v1/giocatori/:id/oggettiNascosti
    app.use('/api/v1/giocatori', oggettiNascosti);
    app.use('/api/v1/moderatori', moderatori);
    app.use('/api/v1/oggettiMappa', oggettiMappa);
    // Per far uso del path GET /api/v1/oggettiMappa/:id/commenti
    app.use('/api/v1/oggettiMappa', commenti);
    app.use('/api/v1/oggettiNonValidati', oggettiNonValidati);
    app.use('/api/v1/oggettiTrovati', oggettiTrovati);
    app.use('/api/v1/oggettiPubblicati', oggettiPubblicati);
    app.use('/api/v1/commenti', commenti);
    app.use('/api/v1/commentiVisualizzati', commentiVisualizzati);
    app.use('/api/v1/commentiNonVisualizzati', commentiNonVisualizzati);
    // authenication:
    app.use('/api/v1/authentication', authentication);

    // Default 404 handler 
    app.use((req, res) => {
        res.status(404);
        res.json({ error: 'Not found' });
    });

} catch (error) {
    console.log(error)
    log.error(error);    
}

module.exports = app;