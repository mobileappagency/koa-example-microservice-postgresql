process.env.NODE_ENV = 'test';

const request = require('supertest');
const server = require('../app');
const knex = require('../lib/db/connection');

describe('routes : events', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('POST /api/event', () => {
    it('should perform upsert on transaction duplicate', async () => {
      const response = await request(server.callback())
        .post('/api/event')
        .send({
          metadata: {
            transaction_id: 'qwertyuiop1234567890',
            created_at: new Date(),
            completed: true
          }
        });

      expect(response.status).toEqual(201);
      expect(response.body).toMatchSnapshot({
       data: [{ created_at: expect.any(String) }],
      });
    });

    it('should successfully insert a new event', async () => {
      const response = await request(server.callback())
        .post('/api/event')
        .send({
          metadata: {
            transaction_id: '1234567890qwertyuiop',
            created_at: new Date(),
            completed: false
          }
        });

      expect(response.status).toEqual(201);
      expect(response.body).toMatchSnapshot({
       data: [{ created_at: expect.any(String) }],
      });
    });
  });

  describe('GET /api/event/:tid', () => {
    it('should successfully retrieve an event by tid', async () => {
      const response = await request(server.callback())
        .get('/api/event/qwertyuiop1234567890');

      expect(response.status).toEqual(200);
      expect(response.body).toMatchSnapshot({
       data: [{ created_at: expect.any(String) }],
      });
    });
  });
});