const { user } = require("./schemaUtente");

class Moderatore extends user{
    constructor(firstname, lastname, age, passwordHash, email, phone){
        super(firstname, lastname, age, passwordHash, email, phone);
    }

}

module.exports = Moderatore;