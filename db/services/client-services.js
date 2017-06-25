'use strict';

var db = require('../knex.js');

var viewUser = (data) => {
	return db('user')
		.where('user_emailAddress', data.user_emailAddress)
		.then(result => {
	        return result[0];
	    });
}

module.exports = {
	addUser: addUser,
	viewUser: viewUser
}