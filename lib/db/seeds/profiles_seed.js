exports.seed = function(knex, Promise) {
  return knex('profiles').del()
    .then(() => {
      return knex('profiles').insert({
        transaction_id: 'qwertyuiop1234567890',
        profile_hash: 'some-hash-value1',
        input_length: 7
      });
    }).then(() => {
      return knex('profiles').insert({
        transaction_id: 'qwertyuiop1234567890',
        profile_hash: 'some-hash-value2',
        input_length: 6
      });
    });
};
