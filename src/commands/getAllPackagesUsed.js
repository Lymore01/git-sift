const { fetchAllDependencies } = require("../services/gitService");
const getRepoDetails = require("../utils/getRepoDetails");

async function getAllDependencies(repoURL) {
  const { owner, repo } = await getRepoDetails(repoURL);
  const data = await fetchAllDependencies(owner, repo);
  const package = data[""].dependencies;
  const allDependencies = Object.keys(package);
  console.log(allDependencies);
}

module.exports = getAllDependencies;
