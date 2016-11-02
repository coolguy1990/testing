exports.up = (knex, Promise) =>
   Promise.all([
     knex.schema.createTableIfNotExists('system_settings', (table) => {
       table.increments();
       table.uuid('uuid');
       table.integer('system_id').unsigned();
       table.foreign('system_id').references('systems.id');
       table.string('key');
       table.string('value');
       table.timestamps();
     }),
   ])
;

exports.down = (knex, Promise) =>
   Promise.all([
     knex.schema.dropTableIfExists('system_settings'),
   ])
;
