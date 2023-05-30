const express = require('express');
const router = express.Router();
const modelloUtente = require('./models/schemaUtente.js'); // get our mongoose model
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const crypto = require('crypto');


// ---------------------------------------------------------
// route to authenticate and get a new token
// ---------------------------------------------------------
router.post('', async function(req, res) {
	console.log("checking credentials");
	try {
		// find the user
		let user = await modelloUtente.findOne({
			email: req.body.email
		}).exec();
		
		// user not found
		if (!user) {
			res.status(405);
			res.json({ success: false, message: 'Authentication failed. User not found.' });
			return;
		}
		
		// calculate hash decomentare prima di consegnare
		// let hash = crypto.pbkdf2Sync(req.body.password, '', 1000, 64, `sha512`).toString(`hex`); 
		// check if password hash matches
		
		// if (user.password != hash) {
		if (user.password != req.body.password) {	
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
		//var token = jwt.sign(payload, process.env.SUPER_SECRET, options);
		var token = jwt.sign(payload, 'supersecretkey', options);

		console.log('email:'+user.email+'\npassword: '+user.password+'\ntype:'+user.ruolo);
		
		// query per trovare il tipo
		switch(user.ruolo){
			case 'Giocatore':{	
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
			case 'Moderatore':{
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
			case 'Amministratore':{
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