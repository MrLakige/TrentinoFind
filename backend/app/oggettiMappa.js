const express = require('express');
const router = express.Router();
const modelloOggetto = require('./models/schemaOggetto');


function filtraOggettoUI(oggettoDB){
    /**
     * Qui mi aspetto che oggettoDB è formato da un solo elemento
     */
    if(!Array.isArray(oggettoDB)){
        oggettoDB = [oggettoDB]
    }
    oggettoDB = oggettoDB.map( (oggettoDB) => {
        return {
            location: oggettoDB.location,
            title: oggettoDB.title,
            description: oggettoDB.description,
            dimension: oggettoDB.dimension,
            difficulty: oggettoDB.difficulty
        };
    });
    return oggettoDB;
}

function filtraOggettiMappaUI(oggettoDB){
    /**
     * Qui mi aspetto che oggettoDB è formato da uno o
     * più elementi
     */
    if(!Array.isArray(oggettoDB)){
        oggettoDB = [oggettoDB]
    }
    oggettoDB = oggettoDB.map( (oggettoDB) => {
        return {
            idOggetto: oggettoDB.id,
            location: oggettoDB.location,
        };
    });
    return oggettoDB;
}

//GET /api/v1/oggettiMappa
router.get('', async (req, res) => {
    // Recupero tutti gli oggetti validati
    let oggettoDB = await modelloOggetto.find({validated: true});
    // Verifico se sono stati recuperati oggetti
    if(!oggettoDB){ 
        res.status(400).json("Nessun oggetto presente nella mappa");
    }else{
        res.status(200).json(filtraOggettiMappaUI(oggettoDB));
    }
});

//GET /api/v1/oggettiMappa/{ID}
router.get('/:id', async (req, res) => {
    // cerco l'oggetto in base all'ID specificato nella richiesta
    let oggettoDB = await modelloOggetto.findById(req.params.id);
    // verifico se è stato trovato l'oggetto
    if(!oggettoDB){ 
        res.status(400).json("ID dell'oggetto non valido");
        // verifico se l'oggetto è stato validato
    }else{
        if(oggettoDB.validate == false){
            res.status(400).json("Oggetto non validato");
        }else{
            res.status(200).json(filtraOggettoUI(oggettoDB));
        }
    }

});



module.exports = router;