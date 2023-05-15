// super classe utente
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
    Autenticazione(){}
    Registrazione(){}
    VisuallizzaInformazioni(){}
    ModificaInformazioni(){}
}

module.exports = Utente;

