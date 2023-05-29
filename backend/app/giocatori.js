const express = require('express');
const router = express.Router();
const modelloGiocatore = require('./models/schemaGiocatore'); // get our mongoose model

const Utente = require("./utenti");
class Giocatore extends Utente{
    giocatoreDB
    constructor(email, password, firstname, lastname, age, phone){
        super(email, password, firstname, lastname, age, phone);
    }
    /**
     * Questa funzione si occupa di verificare se all'interno
     * del database è già presente un giocatore con la stessa email
     * inserita in fase di registrazione
     */
    async verificaGiocatoreEsistente(){
        return await super.verificaUtenteEsistente();
    }
    async verificaRegistrazione(){
        let {isValid, error } = await super.verificaRegistrazione();
        //Se il body è corretto verifico all'interno del database
        //se esiste un account già presente con la stessa email
        if(isValid){
            let thereIsSomeoneElse = await this.verificaGiocatoreEsistente();
            if(thereIsSomeoneElse){
                isValid = false;
                error = "Esiste già un account con questa email"
            }
        }
        return {isValid, error};
    }
    async creaGiocatore(){
        let {isValid, error } = await this.verificaRegistrazione();
        if(isValid){
            await super.creaUtente("Giocatore")
            this.giocatoreDB = new modelloGiocatore(this.filtraInformazioniDB());
            this.giocatoreDB = await this.giocatoreDB.save();
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

/**
 * 
 * @param {*} giocatoreDB 
 * @returns Funzione per filtrare le informazioni dell'oggetto giocatoreDB
 *          che arrivano dal database verso l'esterno
 */
function filtraInformazioni(giocatoreDB){
    giocatoreDB = [giocatoreDB].map( (giocatoreDB) => {
        return {
            email: giocatoreDB.email,
            password: giocatoreDB.password,
            firstname: giocatoreDB.firstname,
            lastname: giocatoreDB.lastname,
            age: giocatoreDB.age,
            phone: giocatoreDB.phone,
        };
    });
    return giocatoreDB;
}

//POST /api/v1/giocatori
router.post('', async (req, res) => {

    let gObject = new Giocatore(req.body.email, req.body.password, req.body.firstname, 
        req.body.lastname, req.body.age, req.body.phone);
    
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
    let giocatoreDB = await modelloGiocatore.findById(req.params.id);
    if(!giocatoreDB){ //if null
        res.status(400).json("ID non valido");
    }else{
        res.status(200).json(filtraInformazioni(giocatoreDB));
    }
});

//PUT /api/v1/giocatori/{ID}
//C'è ancora da aggiungere la verifica della autenticazione
router.put('/:id', async (req, res) => {
    let gObject = new Giocatore(req.body.email, req.body.password, req.body.firstname, 
        req.body.lastname, req.body.age, req.body.phone);
    try{
        let giocatoreDB = await modelloGiocatore.findById(req.params.id);//Esiste un giocatore con quell'ID
        if(!giocatoreDB){ //No, il giocarore non esiste
            res.status(400).json("ID non valido");
        }else{//Si, il giocatore esiste
            //Verifico prima se posso fare la modifica che è stata mandata
            const {isValid, error} = await gObject.verificaRegistrazione();
            if (isValid){//Si, la modifica si può fare
                // findByIdAndUpdate restituisce il documento precedento, non quello passto come parametro
                await modelloGiocatore.findByIdAndUpdate(req.params.id, req.body);
                giocatoreDB = await modelloGiocatore.findById(req.params.id);
                res.status(200).json(filtraInformazioni(giocatoreDB));

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


//DELETE /api/v1/giocatori/{ID}
//C'è ancora da aggiungere la verifica della autenticazione
router.delete('/:id', async (req, res) => {
    let giocatoreId = req.params.id;
    //Verifica dell'autorizzazione
    try{
        //Poi da mattere un metodo della classe?
        let giocatoreDB = await modelloGiocatore.findByIdAndDelete(giocatoreId);
        console.log(giocatoreDB);
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