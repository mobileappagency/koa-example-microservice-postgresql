
exports.seed = function(knex, Promise) {
  return knex('geolocations').del()
    .then(() => {
      return knex('geolocations').insert({
        transaction_id: 'qwertyuiop1234567890',
        latitude: 51.4401187,
        longitude: -0.2165052999
      });
    }).then(() => {
      return knex('geolocations').insert({
        transaction_id: 'qwertyuiop1234567890',
        latitude: 52.4401187,
        longitude: -0.2265052999
      });
    });
};
