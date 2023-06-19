import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR_NAME = 'files';
const SOURCE_FILE_NAME = 'fileToRead.txt';
const ERROR_TEXT_TARGET = 'FS operation failed';

const read = async () => {
  const sourcePath = join(__dirname, SOURCE_DIR_NAME, SOURCE_FILE_NAME);

  try {
    const content = await readFile(sourcePath, { encoding: 'utf8' });

    console.log(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(ERROR_TEXT_TARGET);
    } else {
      throw error;
    }
  }
};

await read();
