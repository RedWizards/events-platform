exports.up = function(knex, Promise) {
	return knex.schema
	
	.createTable('user', function(table){
		table.string('id', 37).primary();
		table.string('user_firstName', 45);
		table.string('user_lastName', 45);
		table.string('user_contactNumber', 20);
		table.string('user_homeAddress');
		table.date('user_birthday');
		table.string('user_company', 45);
		table.string('user_designation', 45);
	})

	.createTable('event', function(table){
		table.string('id', 37).primary();
		table.string('event_name', 45);
		table.integer('event_type');
		table.string('event_description');
		table.string('event_host', 45);
		table.string('event_icon');
		table.string('event_location', 45);
	})

	.createTable('registration', function(table){
		table.string('id', 37).primary();
		table.string('event_id', 37).references('id').inTable('user').notNull().onDelete('cascade');
		table.string('user_id', 37).references('id').inTable('event').notNull().onDelete('cascade');
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
