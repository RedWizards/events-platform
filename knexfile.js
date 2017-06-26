// Update with your config settings.

module.exports = {
  test: {
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : '12345',
      database : 'events-platform'
    },
    pool: { min: 0, max: 7 },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/test'
    }
  },
  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '12345',
      database : 'events-platform'
    },
    pool: { min: 0, max: 7 },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: { min: 0, max: 7 },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/production'
    }
  }
};
