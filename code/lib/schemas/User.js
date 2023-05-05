const { query } = require('express');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UtenteSchema = new Schema({
    id: Number,
    fistname: String,
    lastname: String,
    age: Number,
    passwordHash: String,
    email: String,
    phone: Number,
    type: String
    },{
    query: {
        byName(name){
            return this.where({name: new RegExp(name, 'i')});
        }
    }
    });


