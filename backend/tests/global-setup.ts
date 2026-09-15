import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_DB_PATH = path.join(__dirname, '../../prisma/test.db');

export default function setup() {
  console.log('Running migrations on test database...');

  const normalizedUrl = `file:${TEST_DB_PATH.replace(/\\/g, '/')}`;
  const prismaEntry = new URL('../../node_modules/prisma/build/index.js', import.meta.url);
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