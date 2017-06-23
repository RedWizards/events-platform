var knex = require('../db/knex');

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		knex('user').where({id}).first()
			.then((user) => {
				done(null, user);
			})
			.catch((err) => {
				done(err, null);
			})
	});
}