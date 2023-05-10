const { user } = require("../schemas/User");

class Giocatore extends user{
    constructor(firstname, lastname, age, passwordHash, email, phone){
        super(firstname, lastname, age, passwordHash, email, phone);
    }
}

module.exports = Giocatore;