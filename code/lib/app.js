/// routing api page

// requires
const express = require('express');
const path = require('path');
 

const app = express();


// parsing middelware json file
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use((req,res,next) => {
    console.log(req.method + ' ' + req.url)
    next()
})


/**
 * Resource routing
 */

//app.use('/api/v1/utente', utente);

// return home page
app.use("/",(req, res) => {
    res.status(200);
    console.log("send home page");
    res.sendFile(path.join(__dirname, '../view/html/home.html'));
    //res.json({ error: 'Not found' });
});

// return css file
app.use('/view/css/stile.css',(req, res)=>{
    console.log("send css file");
    res.sendFile(path.join(__dirname, '../view/css/stile.css'));
});


// Default 404 handler 
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});



module.exports = app;