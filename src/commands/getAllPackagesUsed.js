const { fetchAllDependencies } = require("../services/gitService");
const getRepoDetails = require("../utils/getRepoDetails");
const { listRepoContents } = require("../services/gitService");
const classifyFileContents = require("../utils/classifyFileContents");

async function getAllDependencies(repoURL) {
  try {
    const { owner, repo } = await getRepoDetails(repoURL);
    const content = await listRepoContents(owner, repo);
    const results = await classifyFileContents(content);
    
    if (results === "javascript") {
      const data = await fetchAllDependencies(owner, repo);
      if (data && data[""] && data[""].dependencies) {
        const pkg = data[""].dependencies;
        const allDependencies = Object.keys(pkg);
        console.log(allDependencies);
      } else {
        console.log("No dependencies found");
      }
    } else if (results === "none") {
      console.log("No packages found");
    } else {
      console.log(results);
    }
  } catch (error) {
    console.error("Error fetching dependencies:", error);
  }
}
// getAllDependencies('https://github.com/Lymore01/assign.git')
module.exports = getAllDependencies;
