const express = require('express');
const router = express.Router();
const modelloGiocatore = require('./models/schemaGiocatore'); // get our mongoose model
const modelloUtente = require('./models/schemaUtente');
const Utente = require("./utenti");

class Giocatore extends Utente{
    giocatoreDB
    idUser
    constructor(email, password, firstname, lastname, age, phone){
        super(email, password, firstname, lastname, age, phone);
    }
    async creaGiocatore(){
        let {isValid, error } = await super.verificaRegistrazione();
        if(isValid){
            this.idUser = await super.creaUtente("Giocatore")
            this.giocatoreDB = new modelloGiocatore({idUser: this.idUser});
            this.giocatoreDB = await this.giocatoreDB.save();
        }
        return {isValid, error};
    }
    async modificaGiocatore(idGiocatore){
        // 1) Verifico se i campi della richiesta sono corretti (email valida e campi pieni)
        let {isValid, error} = await super.verificaCorrettezzaCampi()
        if(!isValid) return {isValid, error}
        // 2) Verifico se l'id del giocatore è corretto
        this.giocatoreDB = await modelloGiocatore.findById(idGiocatore);
        if(!this.giocatoreDB){// L'id del giocatore non è corretto
            isValid = false
            error = "ID non valido"
            return {isValid, error};
        }
        this.utenteDB = await modelloUtente.findById(this.giocatoreDB.idUser)
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
        await super.modificaUtente(this.giocatoreDB.idUser)
        return {isValid, error};
    }
}

/**
 * 
 * @param {*} giocatoreDB 
 * @returns Funzione per filtrare le informazioni dell'oggetto giocatoreDB
 *          che arrivano dal database verso l'esterno
 */
async function ottieniInformazioniGiocatore(idGiocatore){
    let giocatoreDB = await modelloGiocatore.findById(idGiocatore);
    let idUser = giocatoreDB.idUser;
    let utenteDB = await modelloUtente.findById(idUser);
    if(!giocatoreDB || !utenteDB){
        return false;
    }else{
        return {
            idOggettiTrovati: giocatoreDB.idOggettiTrovati,
            idOggettiNascosti: giocatoreDB.idOggettiNascosti,
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
    // Creazione di un oggetto di tipo Giocatore sulla base della richiesta
    let gObject = new Giocatore(req.body.email, req.body.password, req.body.firstname, 
        req.body.lastname, req.body.age, req.body.phone);
    // Creo il giocatore chiamando il metodo creaGiocatore()
    const {isValid, error} = await gObject.creaGiocatore();

    if (isValid){ 
        let giocatoreId = gObject.giocatoreDB.id
        res.location("/api/v1/giocatori/" + giocatoreId).status(201).send();
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
        let giocatore = ottieniInformazioniGiocatore(req.params.id)
        if(!giocatore){
            res.status(400).json("ID non valido");
        }else{
            res.status(200).send(giocatore) 
        }
    } catch (error){
        res.status(400).json("Formato ID non valido");
    }
});

//PUT /api/v1/giocatori/{ID}
//C'è ancora da aggiungere la verifica della autenticazione
router.put('/:id', async (req, res) => {
    // Creazione di un oggetto di tipo Giocatore sulla base della richiesta
    let gObject = new Giocatore(req.body.email, req.body.password, req.body.firstname, 
        req.body.lastname, req.body.age, req.body.phone);
    try{
        const {isValid, error} = await gObject.modificaGiocatore(req.params.id);
        if (isValid){
            res.status(200).json(ottieniInformazioniGiocatore(req.params.id));
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


//DELETE /api/v1/giocatori/{ID}
//C'è ancora da aggiungere la verifica della autenticazione
router.delete('/:id', async (req, res) => {
    let giocatoreId = req.params.id;
    //Verifica dell'autorizzazione
    try{
        //Poi da mattere un metodo della classe?
        let giocatoreDB = await modelloGiocatore.findByIdAndDelete(giocatoreId);
        let utenteDB = await modelloUtente.findByIdAndDelete(giocatoreDB.idUser);
        console.log(giocatoreDB);
        console.log(utenteDB);
        if(!giocatoreDB){ //Il giocarore specificato non esiste
            res.status(400).json("ID non valido");
        }else{
            res.status(200).json("Rimozione del giocatore avvenuta con successo");
        }
    }catch(error){
        // This catch CastError when giocatoreId cannot be casted to mongoose ObjectId
        res.status(400).json("Formato ID non valido");
    }
});

module.exports = router;