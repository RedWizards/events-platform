exports.up = function(knex, Promise) {
	return knex.schema
		.alterTable('user', function (table) {
	  		table.text('user_password');
		})
};

exports.down = function(knex, Promise) {
	return knex.schema
		.alterTable('user', function (table) {
  			table.dropColumn('user_password');
  		})
};
