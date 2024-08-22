// commands to clone a repo
const simpleGit = require("simple-git");
const program = require("../utils/commander");
const repositoryInfo = require("./scanCommand");

// initialize the instance
const git = simpleGit();

function cloneRepository(repoURL) {
  git
    .clone(repoURL)
    .then(() => console.log("Repository cloned successfully"))
    .catch((err) => console.error("failed to clone repository ", err));
}

// you can add options to scan the repo first before scanning
/* 
if you want the flag '-s' to come before the repo URL, define the flag as a global option. Order of arguments matters

  { .command("clone <repoURL>")
  .description("Clone a repository")
  .option('-s, --scan', 'Scan a repo before cloning'
  } - > the flag comes after the URL
  repoURL should note be placed inside any quotes
*/
program
  .command("clone")
  .description("Clone a repository")
  .option("-s, --scan", "Scan a repo before cloning")
  .argument("<repoURL>", "The repository URL to clone")
  .action(async (repoURL, options) => {
    try {
      if (options.scan) {
        repositoryInfo(repoURL);
      }
      // cloneRepository(repoURL)
    } catch (error) {
      console.error("Failed to clone:", error);
    }
  });

// to pass the command-line arguments
program.parse(process.argv);
