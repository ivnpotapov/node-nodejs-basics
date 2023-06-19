import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR_NAME = 'files';
const SOURCE_FILE_NAME = 'fileToCalculateHashFor.txt';

const calculateHash = async () => {
  const filePath = join(__dirname, SOURCE_DIR_NAME, SOURCE_FILE_NAME);
  const hash = createHash('sha256');

  const readStream = createReadStream(filePath);

  readStream.on('data', (chunk) => hash.update(chunk));
  readStream.on('end', () => {
    const hexHash = hash.digest('hex');
    console.log(hexHash);
  });
};

await calculateHash();
