const simpleGit = require("simple-git");

// initialize the instance
const git = simpleGit();

async function cloneRepository(repoURL) {
  git
    .clone(repoURL)
    .then(() => console.log("Repository cloned successfully"))
    .catch((err) => console.error("failed to clone repository ", err));
}

module.exports = cloneRepository



