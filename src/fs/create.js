import { appendFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TARGET_DIR_NAME = 'files';
const TARGET_FILE_NAME = 'fresh.txt';

const ERROR_TEXT_TARGET = 'FS operation failed';

const create = async () => {
  const filePath = join(__dirname, TARGET_DIR_NAME, TARGET_FILE_NAME);

  try {
    await access(filePath);

    throw new Error(ERROR_TEXT_TARGET);
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        await appendFile(filePath, 'I am fresh and young');
      } catch (errorAppend) {
        throw errorAppend;
      }
    } else {
      throw error;
    }
  }
};

await create();
