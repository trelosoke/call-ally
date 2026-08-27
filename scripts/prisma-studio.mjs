import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const prismaBin = resolve(
  root,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'prisma.cmd' : 'prisma'
);
const dbUrl = pathToFileURL(resolve(root, 'dev.db')).href;

const child = spawn(prismaBin, ['studio'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, DATABASE_URL: dbUrl },
});
child.on('exit', (code) => process.exit(code ?? 0));
