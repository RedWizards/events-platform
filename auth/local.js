var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var knex = require('../db/knex');
var authHelpers = require('./_helpers');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	knex('user').where({id: id}).first()
		.then((user) => {
			done(null, user);
		})
		.catch((err) => {
			done(err, null);
		});
});

passport.use('local', new LocalStrategy({
	usernameField: 'user_emailAddress',
	passwordField: 'user_password'
}, (user_emailAddress, user_password, done) => {

	//check to see if email exists
	knex('user').where({'user_emailAddress': user_emailAddress}).first()
		.then((user) => {
			if(!user)
				return done(null, false);

			if(!authHelpers.comparePass(user_password, user.user_password))
				return done(null, false);
			else
				return done(null, user);
		
		})
		.catch((err) => {
			console.log(err);
			return done(err);
		});
}));

module.exports = passport;