import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';
import { createPrismaClient } from '../lib/prisma-factory.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_DB_PATH = path.join(__dirname, '../../prisma/test.db');
const TEST_DATABASE_URL = `file:${TEST_DB_PATH}`;

export const prisma = createPrismaClient(TEST_DATABASE_URL);

export async function setupTestDatabase() {
    console.log('Running migrations on test database...');

    const normalizedUrl = pathToFileURL(TEST_DB_PATH).href;

    const prismaEntry = new URL('../node_modules/prisma/build/index.js', import.meta.url);
    const prismaPath = fileURLToPath(prismaEntry);

    execFileSync(
        process.execPath,
        [prismaPath, 'migrate', 'deploy'],
        {
            env: { ...process.env, DATABASE_URL: normalizedUrl },
            stdio: 'inherit'
        }
    );

    console.log('Test database ready!');
}
