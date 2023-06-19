import { Worker } from 'worker_threads';
import os from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const WORKER_FILE = 'worker.js';

const performCalculations = async () => {
  const workerPath = join(__dirname, WORKER_FILE);

  const cpusCount = os.cpus().length;

  const resultPromises = [];

  for (let i = 0; i < cpusCount; i++) {
    const workerData = { n: 10 + i };
    const worker = new Worker(workerPath, { workerData });

    resultPromises[i] = new Promise((resolve, reject) => {
      worker.on('message', (result) => {
        resolve({ status: 'resolved', data: result });
      });

      worker.on('error', (error) => {
        reject({ status: 'error', data: null });
      });
    });
  }

  const res = await Promise.allSettled(resultPromises);
  const result = res.map((el) => el.value);

  console.log(result);
};

await performCalculations();
