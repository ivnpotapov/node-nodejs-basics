import { createReadStream } from 'fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'url';
import { stdout, exit } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR_NAME = 'files';
const SOURCE_FILE_NAME = 'fileToRead.txt';

const read = async () => {
  const filePath = join(__dirname, SOURCE_DIR_NAME, SOURCE_FILE_NAME);

  const readStream = createReadStream(filePath);

  readStream.on('data', (chunk) => stdout.write(chunk));
  readStream.on('end', () => exit());
  readStream.on('error', (error) => console.log('Error', error.message));
};

await read();
