// entry point

const artEntry = require("../src/utils/cliArtDesigns");
const cli = require("../src/lib/cli");


async function startCli() {
  await artEntry();
  cli();

}

startCli();
