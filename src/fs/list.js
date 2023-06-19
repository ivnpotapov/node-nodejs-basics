import { readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR_NAME = 'files';
const ERROR_TEXT_TARGET = 'FS operation failed';

const list = async () => {
  const sourcePath = join(__dirname, SOURCE_DIR_NAME);

  try {
    const entranceArr = await readdir(sourcePath);

    entranceArr.forEach((name) => {
      console.log(name);
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(ERROR_TEXT_TARGET);
    } else {
      throw error;
    }
  }
};

await list();
