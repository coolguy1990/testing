exports.up = (knex, Promise) =>
   Promise.all([
     knex.schema.createTableIfNotExists('system_types', (table) => {
       table.increments();
       table.uuid('uuid');
       table.string('name');
       table.string('handle');
       table.timestamps();
     }),
   ])
;

exports.down = (knex, Promise) =>
   Promise.all([
     knex.schema.dropTableIfExists('system_types'),
   ])
;
