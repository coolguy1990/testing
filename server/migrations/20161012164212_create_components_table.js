exports.up = (knex, Promise) =>
   Promise.all([
     knex.schema.createTableIfNotExists('components', (table) => {
       table.increments();
       table.uuid('uuid');
       table.integer('type_id').unsigned();
       table.foreign('type_id').references('component_types.id');
       table.boolean('status');
       table.string('description');
       table.timestamps();
     }),
   ])
;

exports.down = (knex, Promise) =>
   Promise.all([
     knex.schema.dropTableIfExists('components'),
   ])
;
