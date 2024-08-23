const simpleGit = require("simple-git");
const git = simpleGit("D:/CODING/cli-tools/git-sift");

async function getRepositorySize() {
    try {
      const result = await git.raw(["count-objects", "-vH"]);
      console.log("Repository Size:");
      console.log(result);
    } catch (error) {
      console.error(`Failed to fetch repository size: ${error.message}`);
    }
}

module.exports = getRepositorySize;