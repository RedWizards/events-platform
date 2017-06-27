var db = require('../knex.js');
var users = db('user');

var bcrypt = require('bcrypt');

function allUsers(){
	return users
		.then(result => {
			return result;
		})
		.catch(err => {
			return err;
		});
}

function userById(id){
	return users.where({'id': id}, '*')
		.then(result => {
	        return result[0];
	    })
	    .catch(err => {
	    	return err;
	    });
}

function userByEmail(email){
	return users.where({'user_emailAddress': email}, '*')
		.then(result => {
	        return result[0];
	    })
	    .catch(err => {
	    	return err
	    });
}

function createUser(data) {
	const salt = bcrypt.genSaltSync();
	const hash = bcrypt.hashSync(data.user_password, salt);

	return users
		.insert({
			user_firstName: data.user_firstName,
			user_lastName: data.user_lastName,
			user_emailAddress: data.user_emailAddress,
			user_password: hash
		}, '*')
		.then((user) => {
			return user;
		})
		.catch((err) => {
			return err;
		});
}

module.exports = {
	allUsers,
	userById,
	userByEmail,
	createUser
}