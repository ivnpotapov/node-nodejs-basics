import { createReadStream, createWriteStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR_NAME = 'files';
const SOURCE_FILE_NAME = 'fileToCompress.txt';
const RESULT_FILE_NAME = 'archive.gz';

const compress = async () => {
  const sourceFilePath = join(__dirname, SOURCE_DIR_NAME, SOURCE_FILE_NAME);
  const resultFilePath = join(__dirname, SOURCE_DIR_NAME, RESULT_FILE_NAME);

  const gzip = createGzip();
  const sourceStream = createReadStream(sourceFilePath);
  const destinationStream = createWriteStream(resultFilePath);

  sourceStream.pipe(gzip).pipe(destinationStream);
};

await compress();
