const express = require('express');
const router = express.Router();
const modelloOggetto = require('./models/schemaCommento');

class Commento{
    constructor( idPlayer, idObject, date, comment);
}


//POST /api/v1/commento
router.post('', async (req, res) => {

    console.log(req.body);
    let cObject = new Commento(req.body.idPlayer, req.body.idObject, req.body.date, req.body.comment);
    console.log(cObject);
   
    let commentoDB = new modelloCommento(cObject);
	commentoDB = await commentoDB.save();
    let commentoId = commentoDB.id;

    console.log('Commento saved successfully');
    res.location("/api/v1/commenti/" + commentoId).status(201).send();
});

//GET /api/v1/commento/{ID}
router.get('/:id', async (req, res) => {
    let commento = await modelloCommento.findById(req.params.id);
    res.status(200).json(commento);
});

//PUT /api/v1/commento/{ID}
router.put('/:id', async (req, res) => {
    let commento = await modelloCommento.findByIdAndUpdate(req.params.id, req.body);
    commento = await modelloCommento.findById(req.params.id);
    res.status(200).json(commento);
});

module.exports = Commento;
module.exports = router;