const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

const environment = require('./environment');

module.exports = {
  type: 'postgres',
  url: environment.DATABASE_URL,
  migrations: ['dist/migrations/*.js'],
  entities: ['dist/**/*.entity.js'],
  seeds: ['dist/**/*.seeder.js'],
  factories: ['dist/**/*.factory.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTableName: 'typeorm_migration',
  extra: {
    ...(environment.NODE_ENV === 'production' && {
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  },
};
