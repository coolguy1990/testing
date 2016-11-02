exports.up = (knex, Promise) =>
   Promise.all([
     knex.schema.createTableIfNotExists('users', (table) => {
       table.increments();
       table.string('name');
       table.string('email');
       table.string('password');
       table.uuid('uuid');
       table.timestamps();
     }),
   ])
;

exports.down = (knex, Promise) =>
   Promise.all([
     knex.schema.dropTableIfExists('users'),
   ])
;
