const path = require('path');

const BASE_PATH = path.join(__dirname, 'lib/db');

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgresql://localhost:5432/event-api-test',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },

  development: {
    client: 'pg',
    connection: 'postgresql://localhost:5432/event-api',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }
};
