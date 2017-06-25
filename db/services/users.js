'use strict';

var bcrypt = require('bcrypt');
var db = require('../knex.js');

function users() {
	return db('user')
	    .returning('*');	
}

function userById(id){
	return db('user')
		.where({'id': id})
		.returning('*')
		.then(result => {
	        return result[0];
	    });
}

function userByEmail(email){
	return db('user')
		.where({'user_emailAddress': email})
		.returning('*')
		.then(result => {
	        return result[0];
	    });
}

function createUser(req, res) {
	const salt = bcrypt.genSaltSync();
	const hash = bcrypt.hashSync(req.body.user_password, salt);

	return db('user')
		.insert({
			user_firstName: req.body.user_firstName,
			user_lastName: req.body.user_lastName,
			user_emailAddress: req.body.user_emailAddress,
			user_password: req.body.user_password
		})
		.returning('*')
		.then((user) => {
			res.status(200).json({
				status: 'success'
			})
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({
				status: err.message
			});
		});
}

module.exports = {
	users,
	userById,
	userByEmail,
	createUser
}