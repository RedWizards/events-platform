
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('eventType_templates').del(), 

    // Inserts seed entries
    knex('eventType_templates').insert({eventType_name: 'Hackathon', eventType_fields: '[{"type": "text", "placeholder": "First Name"}, {"type": "text", "placeholder": "Last Name"}]'}),
    knex('eventType_templates').insert({eventType_name: 'BootCamp', eventType_fields: '[{"type": "text"}]'}),
    knex('eventType_templates').insert({eventType_name: 'Conference', eventType_fields: '[{"type": "text"}]'})
  );
};
