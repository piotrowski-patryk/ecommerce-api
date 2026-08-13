import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/client.js';
import config from '#/config/index.js';

const adapter = new PrismaPg({
  connectionString: config.database.url,
})

export const prisma = new PrismaClient({ adapter });