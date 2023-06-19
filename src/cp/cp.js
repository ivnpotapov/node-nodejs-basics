import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR_NAME = 'files';
const SOURCE_FILE_NAME = 'script.js';
const spawnChildProcess = async (args) => {
  const childPath = join(__dirname, SOURCE_DIR_NAME, SOURCE_FILE_NAME);

  const child = spawn('node', [childPath, ...args], { stdio: ['pipe', 'pipe', 'inherit', 'ipc'] });
  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 'arg2']);
