const express = require('express');
const router = express.Router();
const modelloModeratore = require('./models/schemaModeratore'); // get our mongoose model
const modelloUtente = require('./models/schemaUtente');
const Utente = require("./utenti");

class Moderatore extends Utente{
    ModeratoreDB
    idUser
    constructor(email, password, firstname, lastname, age, phone){
        super(email, password, firstname, lastname, age, phone);
    }
    async creaModeratore(){
        let {isValid, error } = await super.verificaRegistrazione();
        if(isValid){
            this.idUser = await super.creaUtente("Moderatore")
            this.ModeratoreDB = new modelloModeratore({idUser: this.idUser});
            this.ModeratoreDB = await this.ModeratoreDB.save();
        }
        return {isValid, error};
    }
    async modificaModeratore(idModeratore){
        // 1) Verifico se i campi della richiesta sono corretti (email valida e campi pieni)
        let {isValid, error} = await super.verificaCorrettezzaCampi()
        if(!isValid) return {isValid, error}
        // 2) Verifico se l'id del Moderatore è corretto
        this.ModeratoreDB = await modelloModeratore.findById(idModeratore);
        if(!this.ModeratoreDB){// L'id del Moderatore non è corretto
            isValid = false
            error = "ID non valido"
            return {isValid, error};
        }
        this.utenteDB = await modelloUtente.findById(this.ModeratoreDB.idUser)
        // 3) Verifico se la modifica riguarda anche l'indirizzo email
        if( this.email != this.utenteDB.email ){
            // 4) Se si verifico se l'indirizzo email è gia in uso da un altro utente
            if(await super.verificaUtenteEsistente()){
                isValid = false
                error = "Esiste già un account con questa email"
                return {isValid, error};
            }
        }
        // 5) La modifica può essere effettuate
        await super.modificaUtente(this.ModeratoreDB.idUser)
        return {isValid, error};
    }
}

/**
 * 
 * @param {*} ModeratoreDB 
 * @returns Funzione per filtrare le informazioni dell'oggetto ModeratoreDB
 *          che arrivano dal database verso l'esterno
 */
async function ottieniInformazioniModeratore(idModeratore){
    let ModeratoreDB = await modelloModeratore.findById(idModeratore);
    let idUser = ModeratoreDB.idUser;
    let utenteDB = await modelloUtente.findById(idUser);
    if(!ModeratoreDB || !utenteDB){
        return false;
    }else{
        return {
            email: utenteDB.email,
            firstname: utenteDB.firstname,
            lastname: utenteDB.lastname,
            age: utenteDB.age,
            phone: utenteDB.phone
        }
    }
}

//POST /api/v1/giocatori
router.post('', async (req, res) => {
    // Creazione di un oggetto di tipo Moderatore sulla base della richiesta
    let gObject = new Moderatore(req.body.email, req.body.password, req.body.firstname, 
        req.body.lastname, req.body.age, req.body.phone);
    // Creo il Moderatore chiamando il metodo creaModeratore()
    const {isValid, error} = await gObject.creaModeratore();

    if (isValid){ 
        let ModeratoreId = gObject.ModeratoreDB.id
        res.location("/api/v1/moderatori/" + ModeratoreId).status(201).send();
    }else{
        res.status(400).json({
            message: error
        })
    }
});

//GET /api/v1/giocatori/{ID}
//C'è ancora da aggiungere la verifica della autenticazione
router.get('/:id', async (req, res) => {
    try {
        let Moderatore = await ottieniInformazioniModeratore(req.params.id)
        if(!Moderatore){
            res.status(400).json("ID non valido");
        }else{
            res.status(200).send(Moderatore) 
        }
    } catch (error){
        res.status(400).json("Formato ID non valido");
    }
});

//PUT /api/v1/giocatori/{ID}
//C'è ancora da aggiungere la verifica della autenticazione
router.put('/:id', async (req, res) => {
    // Creazione di un oggetto di tipo Moderatore sulla base della richiesta
    let gObject = new Moderatore(req.body.email, req.body.password, req.body.firstname, 
        req.body.lastname, req.body.age, req.body.phone);
    try{
        const {isValid, error} = await gObject.modificaModeratore(req.params.id);
        if (isValid){
            res.status(200).json(await ottieniInformazioniModeratore(req.params.id));
        }else{//No, la modifica non si può fare
            res.status(400).json({
                //Descrizione dell'errore che non ha permesso la modifica
                message: error
            })
        }
    }catch(error){
        console.log(error)
        // This catch CastError when ModeratoreId cannot be casted to mongoose ObjectId
        res.status(400).json("Formato ID non valido");
    }
});


//DELETE /api/v1/giocatori/{ID}
//C'è ancora da aggiungere la verifica della autenticazione
router.delete('/:id', async (req, res) => {
    let ModeratoreId = req.params.id;
    //Verifica dell'autorizzazione
    try{
        //Poi da mattere un metodo della classe?
        let ModeratoreDB = await modelloModeratore.findByIdAndDelete(ModeratoreId);
        let utenteDB = await modelloUtente.findByIdAndDelete(ModeratoreDB.idUser);
        console.log(ModeratoreDB);
        console.log(utenteDB);
        if(!ModeratoreDB){ //Il giocarore specificato non esiste
            res.status(400).json("ID non valido");
        }else{
            res.status(200).json("Rimozione del Moderatore avvenuta con successo");
        }
    }catch(error){
        // This catch CastError when ModeratoreId cannot be casted to mongoose ObjectId
        res.status(400).json("Formato ID non valido");
    }
});

module.exports = router;