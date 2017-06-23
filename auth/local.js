var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var init = require('./passport')(passport);
var knex = require('../db/knex');

var authHelpers = require('./_helpers');

const options = {};

passport.use(new LocalStrategy(options, (username, password, done) => {
	//check to see if email exists
	knex('user').where({user_emailAddress: username}).first()
		.then((err, user) => {

			console.log(user);

			if(err)
				return done(err);

			if(!user)
				return done(null, false);

			if(!authHelpers.comparePass(password, user.user_password))
				return done(null, false);
			else
				return done(null, user);
		
		})
		.catch((err) => {
			return done(err);
		})
}));

module.exports = passport;