exports.up = (knex, Promise) =>
   Promise.all([
     knex.schema.createTableIfNotExists('modules', (table) => {
       table.increments();
       table.uuid('uuid');
       table.string('name');
       table.string('description');
       table.string('key');
       table.string('value');
       table.integer('port');
       table.boolean('status');
       table.integer('user_id').unsigned();
       table.foreign('user_id').references('users.id');
       table.timestamps();
     }),
   ])
;

exports.down = (knex, Promise) =>
   Promise.all([
     knex.schema.dropTableIfExists('modules'),
   ])
;
