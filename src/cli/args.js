const parseArgs = () => {
  const args = process.argv;

  for (let i = 2; i < args.length; i += 2) {
    const name = args[i].slice(2);
    const value = args[i + 1];

    console.log(`${name} is ${value}`);
  }
};

parseArgs();
