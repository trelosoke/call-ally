import path from 'path';
import { fileURLToPath } from 'url';
import { createPrismaClient } from '../lib/prisma-factory.ts';
import { createApp } from '../server.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_DB_PATH = path.join(__dirname, '../../prisma/test.db');
const TEST_DATABASE_URL = `file:${TEST_DB_PATH.replace(/\\/g, '/')}`;

export const prisma = createPrismaClient(TEST_DATABASE_URL);

export const app = createApp(prisma);

export async function clearDatabase() {
    await prisma.call.deleteMany();
}

export async function teardownTestDatabase() {
    await prisma.$disconnect();
}