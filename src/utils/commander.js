const commander = require("commander");
const repositoryName = require("../commands/getRepoName");
const cloneRepository = require("../commands/cloneCommand");
const getRepoSize = require("../commands/getRepoSize");
const getAllDependencies = require("../commands/getAllPackagesUsed")
const term = require("terminal-kit").terminal;

// create a new commander instance
const program = new commander.Command();

function initializeCommands() {
  program
    .command("sift")
    .description("Sift a repository")
    .option("-s, --scan", "Scan a repo before cloning")
    .option("-n, --name", "Display the repository name")
    .option("-i, --info", "Display repository general information")
    .option("-si, --size", "Display repository size")
    .option("-c, --clone", "Clone a repository")
    .option("-pa, --packages", "Get all packages used in a repository")
    .argument("<repoURL>", "The repository URL to sift")
    .action(async (repoURL, options) => {
      try {
        if (options.scan) {
          await repositoryInfo(repoURL, "");
        }
        if (options.name) {
          await repositoryName(repoURL);
        }
        if (options.info) {
          repositoryInfo(repoURL, "--info");
        }
        if (options.size) {
          await getRepoSize(repoURL);
        }
        if (options.clone) {
          await cloneRepository(repoURL);
        }
        if(options.packages){
          // for js and ts projects only 
          await getAllDependencies(repoURL)
        }
      } catch (error) {
        console.error("Failed to sift:", error);
      }
    });
}

async function handleCommands(command) {
  if (!program.commands.length) {
    initializeCommands();
  }
  program.parse(command.split(" "), { from: "user" });
}

module.exports = handleCommands;
