const readline = require("readline");
const term = require("terminal-kit").terminal;
const figlet = require("figlet");
const program = require("../src/utils/commander");
const repositoryName = require("../src/commands/getRepoName");
const cloneRepository = require("../src/commands/cloneCommand");
const artEntry = require("../src/utils/cliArtDesigns");
const cli = require("../src/lib/cli");

// TODO : make sure the cli entry point is functioning

async function* startCli() {
  await artEntry();
  yield cli();

  yield program
    .command("clone")
    .description("Clone a repository")
    .option("-s, --scan", "Scan a repo before cloning")
    .option("-n, --name", "Display the repository name")
    .option("-i, --info", "Display repository general information")
    .option("-si, --size", "Display repository size")
    .argument("<repoURL>", "The repository URL to clone")
    .action(async (repoURL, options) => {
      try {
        // option
        if (options.scan) {
          repositoryInfo(repoURL, "");
        }
        if (options.name) {
          await repositoryName(repoURL, "--name");
        }
        if (options.info) {
          repositoryInfo(repoURL, "--info");
        }

        // cloneRepository(repoURL)
      } catch (error) {
        console.error("Failed to clone:", error);
      }
    });

  // to pass the command-line arguments
  program.parse(process.argv);

}

startCli().next();
