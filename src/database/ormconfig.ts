import { ConnectionOptions } from 'typeorm';

type Options = ConnectionOptions & { seeds: string[]; factories: string[] };

const options: Options = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'postgres',
  logger: 'advanced-console',
  cli: {
    entitiesDir: './src/database/entities',
    migrationsDir: './src/database/migrations',
  },
  entities: [`${__dirname}/entities/*{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*{.js,.ts}`],
  synchronize: false,
  logging: false,
  seeds: ['./src/database/seeds/**/*{.ts,.js}'],
  factories: ['./src/database/factories/**/*{.ts,.js}'],
};

export = options;
