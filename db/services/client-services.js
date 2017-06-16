'use strict';

var db = require('../knex.js');

var addUser = (data) => {
	return db('user').insert(data, "id")
	    .then(result => {
	        return { id: result[0] };
	    });	
}

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