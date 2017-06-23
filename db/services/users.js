'use strict';

var brcypt = require('bcrypt');

var db = require('../knex.js');

function users() {
	return db('user')
	    .returning('*');	
}

function user(id)

module.exports = {
	users,
	addUser
}