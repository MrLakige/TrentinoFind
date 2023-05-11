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

app.use("/api/v1/giocatore",(req, res)=>{});

//per la classe giocatore
/*
app.get("/api/v1/giocatore/{id}", (req, res))
app.put("/api/v1/giocatore/{id}")
app.delete("/api/v1/giocatore/{id}")
app.set("/api/v1/giocatore")
*/

// return css file
app.get("/view/css/stile.css",(req, res)=>{
    console.log("send css file");
    res.sendFile(path.join(__dirname, '../view/css/stile.css'));
});


// return home page
app.get("/home",(req, res) => {
    res.status(200);
    console.log("send home page");
    res.sendFile(path.join(__dirname, '../view/html/home.html'));
});

// return home page as default
app.use("/",(req, res) => {
    res.status(200);
    console.log("send home page");
    res.sendFile(path.join(__dirname, '../view/html/home.html'));
});


// Default 404 handler 
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});



module.exports = app;