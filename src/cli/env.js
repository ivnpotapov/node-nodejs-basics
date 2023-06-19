const PREFIX = 'RSS_';
const parseEnv = () => {
  const rssEnv = Object.entries(process.env)
    .filter(([name]) => name.startsWith(PREFIX))
    .map(([name, value]) => `${name}=${value}`);

  console.log(rssEnv.join('; '));
};

parseEnv();
