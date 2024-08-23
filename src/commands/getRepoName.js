const repoDetails = require("../utils/getRepoDetails")

async function getRepoName(repoUrl){
    const { owner, repo } = repoDetails(repoUrl)
    console.log("\n\n\n");
    console.log(`   Repository name: ${repo}`)
    console.log(`   Repository author: ${owner}`)
}

module.exports = getRepoName;