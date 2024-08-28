const readline = require("readline");
const { Readable } = require("stream");


async function parser(contents) {
  // create a readable stream from the contents
  const fileStream = Readable.from([contents]);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const packages = [];

  for await (const line of rl) {
    const packageName = await resolver(line);
    if (packageName && !packages.includes(packageName)) {
      packages.push(packageName);
    }
  }

  return packages;
}

async function resolver(line) {
  const importPattern = /^\s*(import|from)\s+([a-zA-Z0-9_.]+)/;
  const match = line.match(importPattern); //boolean
  if (match) {
    return match[2].split(".")[0];
  }
  return null;
}

async function fetchPythonPackagesUsed(contents) {
  await parser(contents);
}

module.exports = fetchPythonPackagesUsed;
