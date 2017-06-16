var express = require('express');
var router = express.Router();

var db = require('../db/services/client-services');
var bcrypt = require('bcrypt');

var session;
var saltRounds = 10;

router.post('/register', function(req, res, next) {

	session = req.session;
	let data = req.body;

	//encrypt password
	data.user_password = bcrypt.hashSync(data.user_password, saltRounds);

	return db.addUser(data)
		.then(result => {
			session.user_id = result.id;
			console.log(session);
			res.redirect('/');
		})
		.catch(err => {
			console.log(err);
			res.status(400).json({
				error: err
			});
		});
});

router.post('/login', function(req, res, next){
	let data = req.body;

	db.viewUser(data)
		.then(result => {
			var similar = bcrypt.compareSync(data.user_password, result.user_password); 
			
			if(similar){
				session = req.session;
				session.user_id = result.id;
				res.redirect('/');
			}else{
				//redirect to login page with error
			}
		})
		.catch(err => {
			console.log(err);
			res.status(400).json({
				error: "Bad Request"
			});
		});
});

router.get('/logout', function(req, res, next){
	req.session.destroy(err => {
		if(err) {
			console.log(err);
			res.status(400).json({
				error: err
			});
	  	}
	  	else {
	    	res.redirect('/');
	  	}
	});
});

module.exports = router;