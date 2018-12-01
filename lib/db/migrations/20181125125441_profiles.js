exports.up = function(knex, Promise) {
  return knex.schema.createTable('profiles', (table) => {
    table.increments();
    table.string('transaction_id').notNullable();
    table.string('profile_hash').notNullable();
    table.integer('input_length').notNullable();
    table.dateTime('created_at', 6).defaultTo(knex.fn.now(6));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profiles');
};
