import { createWriteStream } from 'fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'url';
import { stdin, stdout, exit } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR_NAME = 'files';
const SOURCE_FILE_NAME = 'fileToWrite.txt';

const write = async () => {
  const filePath = join(__dirname, SOURCE_DIR_NAME, SOURCE_FILE_NAME);
  const writeStream = createWriteStream(filePath);

  stdout.write('Enter text and press Enter\n');

  stdin.pipe(writeStream);

  process.on('SIGINT', () => {
    stdout.write('\nText is written');
    exit();
  });

  stdin.on('error', (error) => console.log('Error', error.message));
};

await write();
