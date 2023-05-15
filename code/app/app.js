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


// Default 404 handler 
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});



module.exports = app;