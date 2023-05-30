const express = require('express');
const router = express.Router();
const modelloUtente = require('./models/schemaUtente');
const emailValidator = require('deep-email-validator');
const authentication = require('./authentication.js');

class Utente{
    utenteDB
    constructor(email, password, firstname, lastname, age, phone){
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.phone = phone;
    }
    async verificaEmail(){
        //Ritorna una promise.
        //const {valid, reason, validators} = await emailValidator.validate(this.email)
        //console.log({valid, reason, validators});
        //return valid;
        return true;
    }
    verificaRiempimentoCampi(){
        if (!this.email || !this.password || !this.firstname || !this.lastname 
            || !this.age || !this.phone){
            return false;
          } else{
            return true;
          }
    }
    async verificaCorrettezzaCampi(){
        let isValid = false;
        let error = "Undefined";
        if (!this.verificaRiempimentoCampi()){
            isValid = false;
            error = "Alcuni campi mancano";
            return {isValid,error};
        }
        const valid = await this.verificaEmail();
        if(valid){
            isValid = true;
            error = "";
        }else{
            isValid = false;
            error = "Indirizzo email non valido";
        }
        return {isValid,error};
    }
    async verificaUtenteEsistente(){
        console.log("Verifica Utente Esistente")
        this.utenteDB = await modelloUtente.find({ email: this.email }).exec();
        if(!this.utenteDB.length) {
            //Non è presente nessun utente nel sistema con this.email
            return false;
        }
        return true;
    }
    async creaUtente(ruoloUtente){
        this.utenteDB = new modelloUtente({
            email: this.email,
            password: this.password,
            ruolo: ruoloUtente
        });
        this.utenteDB = await this.utenteDB.save();
        return;
    }
    Autenticazione(){
        authentication.checkCredential();
    }
}

module.exports = Utente;
