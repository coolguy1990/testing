exports.up = (knex, Promise) =>
   Promise.all([
     knex.schema.createTableIfNotExists('component_types', (table) => {
       table.increments();
       table.uuid('uuid');
       table.string('name');
       table.string('type');
       table.timestamps();
     }),
   ])
;

exports.down = (knex, Promise) =>
   Promise.all([
     knex.schema.dropTableIfExists('component_types'),
   ])
;
