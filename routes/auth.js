var express = require('express');
var router = express.Router();

var authHelpers = require('../auth/_helpers');
var userHelpers = require('../db/services/users');

module.exports = (passport) => {
	router.post('/register', authHelpers.loginRedirect, authHelpers.checkUser, (req, res, next) => {
		return userHelpers.createUser(req.body)
			.then(() => {
				passport.authenticate('local', (err, user, info) => {
					if(user){
						req.logIn(user, function(err){
							if(err){
								handleResponse(res, 500, err.message);
							}
							res.redirect('/home');
							// handleResponse(res, 200, 'success');
						});
					}
				})(req, res, next);
			})
			.catch((err) => {
				res.status(500).json({
					status: err.message
				})
			});
	});

	router.post('/login', authHelpers.loginRedirect, (req, res, next) => {
		passport.authenticate('local', (err, user, info) => {
			if(err){
				handleResponse(res, 500, err.message);
			}

			if(!user){
				handleResponse(res, 404, 'User not found');
			}

			if(user){
				req.logIn(user, function(err){
					if(err){
						handleResponse(res, 500, err.message);
					}
					res.redirect('/home');
					// handleResponse(res, 200, 'success');
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

