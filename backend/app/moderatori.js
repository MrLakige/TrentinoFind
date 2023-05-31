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
        let {isValid, error } = await super.verificaCorrettezzaCampi();
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
            this.moderatoreDB = new modelloModeratore(this.filtraInformazioniDB());
            this.moderatoreDB = await this.moderatoreDB.save();
        }
        return {isValid, error};
    }
    async modificaModeratore(moderatoreId){
        let {isValid, error} = await super.verificaCorrettezzaCampi()
        if(!isValid) return {isValid, error}
        //Verifico inanzitutto la correttezza dell'id
        this.moderatoreDB = await modelloModeratore.findById(moderatoreId);
        if(!this.moderatoreDB){//Il giocatore non esiste
            isValid = false
            error = "ID non valido"
            return {isValid, error};
        }
        /**
         * Se i campi della richiesta sono corretti, e l'indirizzo email è diverso
         * da quello precedente (presente ore nel DB), e non esiste alcun utente
         * che ha quell'indirizzo email allora posso effettuare la modifica,
         * allo stesso modo effetuo la modifica se l'indirizzo email della richiesta è
         * uguale a quello precedente presente nel database.
         */
        let thereIsSomeoneElse = await super.verificaUtenteEsistente();
        if((( this.email != this.moderatoreDB.email) & (thereIsSomeoneElse))){
            isValid = false
            error = "Esiste già un account con questa email"
            return {isValid, error};
        }else{
            await modelloModeratore.findByIdAndUpdate(moderatoreId,this.filtraInformazioniDB());
            this.moderatoreDB = await modelloModeratore.findById(moderatoreId);
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
            phone: moderatoreDB.phone
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
        const {isValid, error} = await mObject.modificaModeratore(req.params.id);
        if (isValid){
            res.status(200).json(filtraInformazioni(mObject.moderatoreDB));
        }else{//No, la modifica non si può fare
            res.status(400).json({
                //Descrizione dell'errore che non ha permesso la modifica
                message: error
            })
        }
    }catch(error){
        console.log(error)
        // This catch CastError when giocatoreId cannot be casted to mongoose ObjectId
        res.status(400).json("Formato ID non valido");
    }
});

module.exports = router;
