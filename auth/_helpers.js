var bcrypt = require('bcrypt');
var knex = require('../db/knex');

function loginRequired(req, res, next){
	if(!req.user)
		return res.status(400).json({
			status: 'Please Log In'
		});
	return next();
}

function loginRedirect(req, res, next) {
	if(req.user) 
		return res.status(400).json({
			status: 'You are already logged in'
		});
	return next();
}

function comparePass(userPassword, databasePassword){
	return bcrypt.compareSync(userPassword, databasePassword);
}

module.exports = {
	loginRedirect,
	comparePass,
	loginRequired,
	loginRedirect
}