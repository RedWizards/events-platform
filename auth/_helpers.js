var bcrypt = require('bcrypt');
var userHelper = require('../db/services/users');

function loginRequired(req, res, next){
	if(!req.user)
		res.redirect('/login');
		// handleResponse(res, 400, 'Please Log In');
	return next();
}

function loginRedirect(req, res, next) {
	if(req.user) 
		res.redirect('/home');
		// handleResponse(res, 400, 'You are already logged in');
	return next();
}

function checkUser(req, res, next){
	return userHelper.userByEmail(req.body.user_emailAddress)
		.then((user) => {
			if(user)
				handleResponse(res, 403, 'You already signed up');
			return next();
		})
		.catch(err => {
			handleResponse(res, 500, 'error');
		});
}

function comparePass(userPassword, databasePassword){
	return bcrypt.compareSync(userPassword, databasePassword);
}

function handleResponse(res, code, statusMsg){
	res.status(code).json({
		status: statusMsg
	});
}

module.exports = {
	checkUser,
	loginRequired,
	loginRedirect,
	comparePass
}