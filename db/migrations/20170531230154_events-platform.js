exports.up = function(knex, Promise) {
	return knex.schema

	.dropTable('eventType_templates')

	.dropTable('registration')

	.dropTable('event')
	
	.dropTable('user')
	
	.createTable('user', function(table){
		table.uuid('id').defaultTo(knex.raw('uuid_generate_v1()')).primary();
		table.string('user_firstName', 45).notNullable();
		table.string('user_lastName', 45).notNullable();
		table.string('user_emailAddress', 45).notNullable();
		table.string('user_contactNumber', 20);
		table.string('user_homeAddress');
		table.date('user_birthday');
		table.string('user_company', 45);
		table.string('user_designation', 45);
	})

	.createTable('event', function(table){
		table.uuid('id').defaultTo(knex.raw('uuid_generate_v1()')).primary();
		table.string('event_name', 45).notNullable();
		table.uuid('event_type').notNullable();
		table.string('event_description').notNullable();
		table.string('event_host', 45).notNullable();
		table.string('event_icon');
		table.string('event_location', 45).notNullable();
	})

	.createTable('registration', function(table){
		table.uuid('id').defaultTo(knex.raw('uuid_generate_v1()')).primary();
		table.uuid('event_id').references('id').inTable('user').notNull().onDelete('cascade');
		table.uuid('user_id').references('id').inTable('event').notNull().onDelete('cascade');
		table.date('registration_date');
	})

	.createTable('eventType_templates', function(table){
		table.uuid('id').defaultTo(knex.raw('uuid_generate_v1()')).primary();
		table.string('eventType_name', 45).notNullable();
		table.json('eventType_fields').notNullable();
	})
};

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('eventType_templates')
		.dropTable('registration')
		.dropTable('event')
		.dropTable('user');
};
