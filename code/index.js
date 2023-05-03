
var mongodb = require('./lib/database/dbms.js');

// method with express
var express = require('express');
var app = express();
var port = 3000;

app.get('/', function(req, res){
    res.send('GET request');
});

app.post('/', function(req, res){
    res.send('POST request');
});

app.put('/user', function(req, res){
    res.send('PUT request');
});

app.delete('/user', function(req, res){
    res.send('DELETE request');
});

app.get('/hello', function(req, res){
    res.send('Hello world!');
});


res.get('/login', function(req, res){
    
});

app.get('/logout', function(req, res){
    
});


app.listen(port, function() {
    console.log('Server running on port ', 3000);
});