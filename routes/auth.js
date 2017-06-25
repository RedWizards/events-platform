var express = require('express');
var router = express.Router();

var authHelpers = require('../auth/_helpers');
var userHelpers = require('../db/services/users');

module.exports = (passport) => {
	router.post('/register', authHelpers.loginRedirect, (req, res, next) => {
		passport.authenticate('local', (err, user, info) => {
			if(user)
				handleResponse(res, 400, 'You already signed up');
			else{
				return userHelpers.createUser(req, res);
			}
			
		})(req, res, next);
	});

	router.post('/login', authHelpers.loginRedirect, (req, res, next) => {
		passport.authenticate('local', (err, user, info) => {
			if(err){
				handleResponse(res, 500, 'error');
			}

			if(!user){
				handleResponse(res, 400, 'User not found');
			}

			if(user){
				req.logIn(user, function(err){
					if(err){
						handleResponse(res, 500, 'error');
					}
					handleResponse(res, 200, 'success');
				});
			}
		})(req, res, next);
	});

	function handleResponse(res, code, statusMsg){
		res.status(code).json({
			status: statusMsg
		});
	}

	return router;
};

