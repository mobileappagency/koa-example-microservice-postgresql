exports.up = function(knex, Promise) {
  return knex.schema.createTable('geolocations', (table) => {
    table.increments();
    table.string('transaction_id').notNullable();
    table.float('latitude').notNullable();
    table.float('longitude').notNullable();
    table.dateTime('created_at', 6).defaultTo(knex.fn.now(6));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('geolocations');
};
