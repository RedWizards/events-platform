var express = require('express');
var router = express.Router();

var authHelpers = require('../auth/_helpers');
var passport = require('../auth/local');

router.post('/register', authHelpers.loginRedirect, (req, res, next) => {
	return authHelpers.createUser(req, res)
		.then((response) => {
			passport.authenticate('local', (err, user, info) => {
				if(user){
					handleResponse(res, 200, 'success');
				}
			})(req, res, next);
		})
		.catch((err) => {
			console.log(err);
			handleResponse(res, 500, 'error');
		});
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
				console.log(err);
				if(err){
					handleResponse(req, 500, 'error');
				}
			});
		}
	})(req, res, next);
});

function handleResponse(res, code, statusMsg){
	res.status(code).json({
		status: statusMsg
	});
}

module.exports = router;

