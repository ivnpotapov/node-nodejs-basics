import { stdin, stdout } from 'process';
import { Transform } from 'stream';
const transform = async () => {
  const getReverseInput = (chunk) => {
    const arr = chunk.toString().trim().split('');

    return arr.reverse().join('') + '\n';
  };

  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversedChunk = getReverseInput(chunk);

      callback(null, reversedChunk);
    },
  });

  stdin.pipe(reverseTransform).pipe(stdout);
};

await transform();
