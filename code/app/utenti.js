const express = require('express');
const router = express.Router();
const emailValidator = require('deep-email-validator');

class Utente{
    constructor(email, firstname, lastname, age, phone){
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.phone = phone;
    }
    getfirstname(){
        return this.firstname;
    }
    getlastname(){
        return this.lastname;
    }
    description(){
        return this.firstname + "," + this.lastname + "," + this.age;
    }
    verificaEmail(){
        return emailValidator.validate(this.email);
    }
    verificaRiempimentoCampi(){
        if (!this.email || !this.firstname || !this.lastname 
            || !this.age || !this.phone){
            return false;
          } else{
            return true;
          }
    }
    /**
     * Registrazione()
     * Questo metodo si occupa di verificare se è possibile effettuare una 
     * registrazione di un utente all'interno del sistema, in particolare
     * verificando se l'utente è già stato registrato (verificando se 
     * l'indirizzo email è già presente), e se i dati immessi sono dati 
     * validi.
     */
    verificaRegistrazione(){

    }
    
    
    Autenticazione(){}
    VisuallizzaInformazioni(){}
    ModificaInformazioni(){}
}

module.exports = Utente;

