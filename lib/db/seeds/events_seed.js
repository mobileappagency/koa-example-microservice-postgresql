exports.seed = (knex, Promise) => {
  return knex('events').del()
    .then(() => {
      return knex('events').insert({
        transaction_id: 'qwertyuiop1234567890',
        completed: false
      });
    });
};