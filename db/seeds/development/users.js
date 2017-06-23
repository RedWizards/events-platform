const bcrypt = require('bcrypt');

exports.seed = (knex, Promise) => {
	return knex('user').del()
		.then(function(){
			const salt = brcypt.genSaltSync();
			const hash = bcrypt.hashSync('T3chEvents', salt);

			return Promise.join(
				knex('user').insert({
					user_firstName: 'Elaine',
					user_lastName: 'Cedillo',
					user_emailAddress: 'ebcedillo@gmail.com',
					user_password: hash
				});
			);
		});
}