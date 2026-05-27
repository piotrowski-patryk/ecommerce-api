import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from './generated/client.js';
import config from '#/config/index.js';

const adapter = new PrismaMariaDb({
  host: config.database.host,
  port: Number(config.database.port),
  user: config.database.user,
  password: config.database.password,
  database: config.database.name,
  connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter });