exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', (table) => {
    table.increments();
    table.string('transaction_id').notNullable().unique();
    table.boolean('completed').notNullable();
    table.dateTime('created_at', 6).defaultTo(knex.fn.now(6));
  });
};

exports.down = async function(knex, Promise) {
  return knex.schema.dropTable('events');
};
