const express = require('express');
const router = express.Router();
const utente = require('./models/schemaUtente.js'); // get our mongoose model
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const crypto = require('crypto');


// ---------------------------------------------------------
// route to authenticate and get a new token
// ---------------------------------------------------------
router.post('', async function(req, res) {
	
	try {
		// find the user
		let user = await utente.findOne({
			email: req.body.email
		}).exec();
		
		// user not found
		if (!user) {
			res.status(405);
			res.json({ success: false, message: 'Authentication failed. User not found.' });
			return;
		}
		
		// calculate hash
		let hash = crypto.pbkdf2Sync(req.body.password, '', 1000, 64, `sha512`).toString(`hex`); 
		// check if password hash matches
		if (user.password != hash) {
			res.status(405);
			res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		}
		
		// if user is found and password is right create a token
		var payload = {
			email: user.email,
			id: user._id
			// other data encrypted in the token	
		}
		var options = {
			expiresIn: 86400 // expires in 24 hours
		}
		var token = jwt.sign(payload, process.env.SUPER_SECRET, options);
		
		// query per trovare il tipo
		switch(user.ruolo){
			case 0:{	
				res.status(200);
				res.json({
					success: true,
					message: 'Token Create',
					token: token,
					email: user.email,
					id: user._id,
					self: "api/v1/giocatore/" + user._id	// redirect alla pagina giocatore
				});
			}break;
			case 1:{
				res.status(200);
				res.json({
					success: true,
					message: 'Token Create',
					token: token,
					email: user.email,
					id: user._id,
					self: "api/v1/moderatore/" + user._id  	// redirect alla pagina moderatore
				});
			}break;
			case 2:{
				res.status(200);
				res.json({
					success: true,
					message: 'Token Create',
					token: token,
					email: user.email,
					id: user._id,
					self: "api/v1/amministratore/" + user._id	// redirect alla pagina amministratore
				});
			}break;
			default:{
				res.status(502);
				res.json({
					success: false,
					message: 'Server Internal error'
				});
			};
		}

    } catch (error) {
        console.error(error);
		res.status(502);
        res.json({ success: false, message: 'Server error' });
    }

});

module.exports = router;