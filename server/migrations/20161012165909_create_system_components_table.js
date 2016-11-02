exports.up = (knex, Promise) =>
   Promise.all([
     knex.schema.createTableIfNotExists('system_components', (table) => {
       table.increments();
       table.uuid('uuid');
       table.integer('system_id').unsigned();
       table.foreign('system_id').references('systems.id');
       table.string('key');
       table.integer('component_id').unsigned();
       table.foreign('component_id').references('components.id');
       table.timestamps();
     }),
   ])
;

exports.down = (knex, Promise) =>
   Promise.all([
     knex.schema.dropTableIfExists('system_components'),
   ])
;
