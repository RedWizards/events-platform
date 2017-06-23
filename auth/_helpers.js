var bcrypt = require('bcrypt');
var knex = require('../db/knex');

function createUser(req) {
	const salt = bcrypt.genSaltSync();
	const hash = bcrypt.hashSync(req.body.user_password, salt);

	return knex('user')
		.insert({
			user_firstName: req.body.user_firstName,
			user_lastName: req.body.user_lastName,
			user_emailAddress: req.body.user_emailAddress,
			user_password: req.body.user_password
		})
		.returning('*')
		.catch((err) => {
			res.status(400).json({
				status: err.message
			});
		});
}	

function comparePass(userPassword, databasePassword){
	return bcrypt.compareSync(userPassword, databasePassword);
}

function loginRequired(req, res, next){
	if(!req.user)
		return res.status(401).json({
			status: 'Please Log In'
		});
	return next();
}

function loginRedirect(req, res, next) {
	if(req.user) 
		return res.status(401).json({
			status: 'You are already logged in'
		});
	return next();
}

function handleErrors(req){
	return new Promise((resolve, reject) => {
		if(req.body.user_password.length < 6){
			reject({
				message: 'Password must be at least 6 characters'
			})
		}
		else{
			resolve();
		}
	});
}

module.exports = {
	comparePass,
	createUser,
	loginRedirect,
	loginRequired,
	handleErrors
}