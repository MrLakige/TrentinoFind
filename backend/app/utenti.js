const express = require('express');
const router = express.Router();
const schemaUtente = require('./models/schemaUtente');
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
    async creaUtente(){
        /**
         * email: String,
           password: String,
                ruolo: {
           type: String,
           enum:['Giocatore','Moderatore', 'Amministratore'],
           default: 'Giocatore'
            }
         */
        utenteDB = new modelloUtente();
        utenteDB = await utenteDB.save();
        let giocatoreId = giocatoreDB.id;
    }
    async verificaEmail(){
        //Ritorna una promise.
        //console.log(await emailValidator.validate(this.email));
        //const {valid, reason, validators} = await emailValidator.validate(this.email)
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
    async verificaRegistrazione(){
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
    
    
    Autenticazione(){
        authentication.checkCredential();
    }
    VisuallizzaInformazioni(){}
    ModificaInformazioni(){}
}

module.exports = Utente;


