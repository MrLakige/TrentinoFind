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
        //Ritorna una promise.
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
    async verificaRegistrazione(){
        let isValid = false;
        let error = "Undefined";

        if (!this.verificaRiempimentoCampi()){
            isValid = false;
            error = "Alcuni campi mancano";
            return {isValid,error};
        }

        const {valid, reason, validators} = await this.verificaEmail();
        if(valid){
            isValid = true;
            error = "";
        }else{
            isValid = false;
            error = "Please provide a valid email address.";
        }

        return {isValid,error};
    }
    
    
    Autenticazione(){}
    VisuallizzaInformazioni(){}
    ModificaInformazioni(){}
}

module.exports = Utente;

