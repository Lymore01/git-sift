const repoDetails = require("../utils/getRepoDetails");
const term = require("terminal-kit").terminal;
const drawBox = require("../utils/drawBoxWrapper");

async function getRepoName(repoUrl) {
  const { owner, repo } = await repoDetails(repoUrl);
  const texts = [`Repository name: ${repo}`, `Repository author: ${owner}`];
  term.cyan("\n\n");
  drawBox(texts);
  term.cyan("\n\n");
}

module.exports = getRepoName;

