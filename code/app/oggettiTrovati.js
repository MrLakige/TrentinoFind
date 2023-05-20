const express = require('express');
const router = express.Router();

class OggettoTrovato{
    constructor(IDgiocatore, IDoggetto, codiceDiValidazione){
        IDgiocatore = this.IDgiocatore;
        IDoggetto = this.IDoggetto;
        codiceDiValidazione = this.codiceDiValidazione;
    }
    verificaRiempimentoCampi(){
        if (!this.IDgiocatore || !this.IDoggetto || !this.codiceDiValidazione ){
            return false;
          } else{
            return true;
          }
    }
}

//POST /api/v1/oggettiTrovati
router.post('', async (req, res) => {
    let oTObject = new OggettoTrovato(req.body.giocatore, req.body.oggettod, req.body.codiceDiValidazione)
});

module.exports = router;