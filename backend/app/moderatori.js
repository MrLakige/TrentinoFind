const express = require('express');
const router = express.Router();
const modelloModeratore = require('./models/schemaModeratore'); // get our mongoose model
const Utente = require("./utenti");

class Moderatore extends Utente{
    moderatoreDB
    constructor(email, password, firstname, lastname, age, phone){
        super(email, password, firstname, lastname, age, phone);
    }
    /**
     * Questa funzione si occupa di verificare se all'interno
     * del database è già presente un giocatore con la stessa email
     * inserita in fase di registrazione
     */
    async verificaModeratoreEsistente(){
        return await super.verificaUtenteEsistente();
    }
    async verificaRegistrazione(){
        let {isValid, error } = await super.verificaRegistrazione();
        //Se il body è corretto verifico all'interno del database
        //se esiste un account già presente con la stessa email
        if(isValid){
            let thereIsSomeoneElse = await this.verificaModeratoreEsistente();
            if(thereIsSomeoneElse){
                isValid = false;
                error = "Esiste già un account con questa email"
            }
        }
        return {isValid, error};
    }
    async creaModeratore(){
        let {isValid, error } = await this.verificaRegistrazione();
        if(isValid){
            await super.creaUtente("Moderatore")
            this.moderatoreDB = new modelloGiocatore(this.filtraInformazioniDB());
            this.moderatoreDB = await this.moderatoreDB.save();
        }
        return {isValid, error};
    }
    filtraInformazioniDB(){
        return {
            email: this.email,
            password: this.password,
            firstname: this.firstname,
            lastname: this.lastname,
            age: this.age,
            phone: this.phone
            }
    }
}

function filtraInformazioni(moderatoreDB){
    moderatoreDB = [moderatoreDB].map( (moderatoreDB) => {
        return {
            email: moderatoreDB.email,
            password: moderatoreDB.password,
            firstname: moderatoreDB.firstname,
            lastname: moderatoreDB.lastname,
            age: moderatoreDB.age,
            phone: moderatoreDB.phone,
        };
    });
    return moderatoreDB;
}

//POST /api/v1/moderatori
router.post('', async (req, res) => {

    let mObject = new Moderatore(req.body.email, req.body.password, req.body.firstname, 
        req.body.lastname, req.body.age, req.body.phone);
    
    const {isValid, error} = await mObject.creaModeratore();

    if (isValid){ 
        let moderatoreId = mObject.moderatoreDB.id
        res.location("/api/v1/moderatori/" + moderatoreId).status(201).send();
    }else{
        res.status(400).json({
            message: error
        })
    }
});

//GET /api/v1/moderatori/{ID}
//C'è ancora da aggiungere la verifica della autenticazione
router.get('/:id', async (req, res) => {
    let moderatoreDB = await modelloModeratore.findById(req.params.id);
    if(!moderatoreDB){ //if null
        res.status(400).json("ID non valido");
    }else{
        res.status(200).json(filtraInformazioni(moderatoreDB));
    }
});

//PUT /api/v1/moderatori/{ID}
//C'è ancora da aggiungere la verifica della autenticazione
router.put('/:id', async (req, res) => {
    let mObject = new Moderatore(req.body.email, req.body.password, req.body.firstname, 
        req.body.lastname, req.body.age, req.body.phone);
    try{
        let moderatoreDB = await modelloModeratore.findById(req.params.id);//Esiste un giocatore con quell'ID
        if(!moderatoreDB){ //No, il giocarore non esiste
            res.status(400).json("ID non valido");
        }else{//Si, il giocatore esiste
            //Verifico prima se posso fare la modifica che è stata mandata
            const {isValid, error} = await mObject.verificaRegistrazione();
            if (isValid){//Si, la modifica si può fare
                // findByIdAndUpdate restituisce il documento precedento, non quello passto come parametro
                await modelloModeratore.findByIdAndUpdate(req.params.id, req.body);
                moderatoreDB = await modelloModeratore.findById(req.params.id);
                res.status(200).json(filtraInformazioni(moderatoreDB));

            }else{//No, la modifica non si può fare

                res.status(400).json({
                    //Descrizione dell'errore che non ha permesso la modifica
                    message: error
                })

            }
        }

    }catch(error){
        // This catch CastError when giocatoreId cannot be casted to mongoose ObjectId
        res.status(400).json("Formato ID non valido");
    }
});

module.exports = router;
module.exports = Moderatore;