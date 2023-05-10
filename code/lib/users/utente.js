// super classe utente
class Utente{
    constructor(firstname, lastname, age, passwordHash, email, phone){
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.passwordHash = passwordHash;
        this.email = email;
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

