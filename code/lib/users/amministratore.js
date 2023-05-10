const { user } = require("../schemas/User");

class Amministratore extends user{
    constructor(firstname, lastname, age, passwordHash, email, phone){
        super(firstname, lastname, age, passwordHash, email, phone);
    }

}

module.exports = Utente;