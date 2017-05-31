exports.up = function(knex, Promise) {
	return knex.schema

	.createTable('user', function(table){
		table.string('id').primary();
		table.string('user_firstName');
		table.string('user_lastName');
		table.string('user_contactNumber');
		table.string('user_homeAddress');
		table.string('user_birthday');
		table.string('user_company');
		table.string('user_designation');
	})

	.createTable('event', function(table){
		table.string('id').primary();
		table.string('event_name');
		table.integer('event_type');
		table.string('event_description');
		table.string('event_host');
		table.string('event_icon');
		table.string('event_location');
	})

	.createTable('registration', function(table){
		table.string('id').primary();
		table.string('event_id').references('id').inTable('user').notNull().onDelete('cascade');
		table.string('user_id').references('id').inTable('event').notNull().onDelete('cascade');
		table.date('registration_date');
	})

	.createTable('eventType_templates', function(table){
		table.integer('id').primary();
		table.json('event_fields');
	})
};

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('eventType_templates')
		.dropTable('registration')
		.dropTable('event')
		.dropTable('user');
};
