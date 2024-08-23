// command to scan the repo to be cloned
const repoDetails = require("../utils/getRepoDetails");

/* 
  store the data in a an object
*/

async function displayRepositoryInfo(repoURL, flag) {
  try {
    const { owner, repo } = repoDetails(repoURL);

    const flags = ["--name", "--info", "--fetch--file"];

    if (flags.includes(flag)) {
    
      if (flag === "--info") {
        console.log(`Repository name: ${repo}`);
        const repoContents = await listRepoContents(owner, repo);
        console.log("Repository contents:");
        displayStructure(repoContents);

        await getRepositorySize();
        const repoInfo = await getRepositoryInformation(repoURL);
        console.log("Repository information:\n\n");
        console.log(repoInfo);

        return;
      }

      if (flag === "--fetch--file") {
        // 
      }
    }

  } catch (error) {
    console.error(error);
  }
}

module.exports = displayRepositoryInfo;

/* 
 I encountered errors with using simple-git to get repository information, it had issues with ssh authentication and https protocol support. To solve this execute git command directly using node js's 'child_process'
 
*/
