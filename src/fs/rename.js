import { access, rename as fsRename } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR_NAME = 'files';
const SOURCE_FILE_NAME = 'wrongFilename.txt';
const RESULT_FILE_NAME = 'properFilename.md';

const ERROR_TEXT_TARGET = 'FS operation failed';
const ERROR_TEXT_EMPTY_SOURCE = 'Empty source';

const rename = async () => {
  const sourceFilePath = join(__dirname, SOURCE_DIR_NAME, SOURCE_FILE_NAME);
  const resultFilePath = join(__dirname, SOURCE_DIR_NAME, RESULT_FILE_NAME);

  try {
    await access(sourceFilePath);
  } catch {
    throw new Error(ERROR_TEXT_TARGET);
  }

  try {
    await access(resultFilePath);

    throw new Error(ERROR_TEXT_EMPTY_SOURCE);
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        await fsRename(sourceFilePath, resultFilePath);
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error(ERROR_TEXT_TARGET);
    }
  }
};

await rename();
