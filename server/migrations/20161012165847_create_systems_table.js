exports.up = (knex, Promise) =>
   Promise.all([
     knex.schema.createTableIfNotExists('systems', (table) => {
       table.increments();
       table.uuid('uuid');
       table.integer('user_id').unsigned();
       table.foreign('user_id').references('users.id');
       table.string('name');
       table.string('description');
       table.integer('system_type_id').unsigned();
       table.foreign('system_type_id').references('system_types.id');
       table.timestamps();
     }),
   ])
;

exports.down = (knex, Promise) =>
   Promise.all([
     knex.schema.dropTableIfExists('systems'),
   ])
;
