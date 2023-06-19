import { createReadStream, createWriteStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR_NAME = 'files';
const SOURCE_FILE_NAME = 'archive.gz';
const RESULT_FILE_NAME = 'fileToCompress.txt';

const decompress = async () => {
  const sourceFilePath = join(__dirname, SOURCE_DIR_NAME, SOURCE_FILE_NAME);
  const resultFilePath = join(__dirname, SOURCE_DIR_NAME, RESULT_FILE_NAME);

  const gunzip = createGunzip();
  const sourceStream = createReadStream(sourceFilePath);
  const destinationStream = createWriteStream(resultFilePath);

  sourceStream.pipe(gunzip).pipe(destinationStream);
};

await decompress();
