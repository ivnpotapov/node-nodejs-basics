import { access, mkdir, readdir, copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR_NAME = 'files';
const RESULT_DIR_NAME = 'files_copy';

const ERROR_TEXT_TARGET = 'FS operation failed';
const ERROR_TEXT_ALREADY_EXISTS = 'Already exists';

const copy = async () => {
  const sourcePath = join(__dirname, SOURCE_DIR_NAME);
  const destinationPath = join(__dirname, RESULT_DIR_NAME);

  try {
    await access(sourcePath);
  } catch {
    throw new Error(ERROR_TEXT_TARGET);
  }

  try {
    await access(destinationPath);

    throw new Error(ERROR_TEXT_ALREADY_EXISTS);
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        await mkdir(destinationPath);

        const entranceArr = await readdir(sourcePath, { withFileTypes: true });

        entranceArr.forEach(async (el) => {
          const elementSourcePath = join(sourcePath, el.name);
          const elementDestinationPath = join(destinationPath, el.name);

          if (el.isFile()) {
            await copyFile(elementSourcePath, elementDestinationPath);
          } else if (el.isDirectory()) {
            await copy(elementSourcePath, elementDestinationPath);
          }
        });
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error(ERROR_TEXT_TARGET);
    }
  }
};

await copy();
