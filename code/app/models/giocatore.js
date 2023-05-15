const { user } = require("./schemaUtente");

class Giocatore extends user{
    constructor(firstname, lastname, age, passwordHash, email, phone){
        super(firstname, lastname, age, passwordHash, email, phone);
    }
}

module.exports = Giocatore;