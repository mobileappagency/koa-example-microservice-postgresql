const knex = require('../connection');

function upsertEvent(event) {
  const insert = knex('events').insert(event);
  const update = knex.queryBuilder().update(event);
  return knex.raw(
    '? ON CONFLICT (transaction_id) DO ? RETURNING *',
    [insert, update]).get('rows');
}

function getEventById(tid) {
  return knex.raw(`
    SELECT
       e.transaction_id,
       e.created_at,
       p.input_length,
       p.profile_hash,
       g.latitude,
       g.longitude
    FROM events e
    LEFT JOIN profiles p ON e.transaction_id = p.transaction_id
    LEFT JOIN geolocations g ON e.transaction_id = g.transaction_id
    WHERE p.transaction_id = ?
    ORDER BY g.created_at DESC, p.created_at DESC
    LIMIT 1;`, [tid]).get('rows');
}

function addMetric({ type, content }) {
  return knex(type)
    .insert(content);
}

function deleteEvent(id) {
  return knex('events')
    .del()
    .where({ id: parseInt(id) })
    .returning('*');
}

module.exports = {
  upsertEvent,
  addMetric,
  getEventById,
  deleteEvent
};