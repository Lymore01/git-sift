// command to scan the repo to be cloned
const simpleGit = require("simple-git");
const { exec } = require("child_process");
const { rejects } = require("assert");
const { stderr, stdout } = require("process");
const path = require("path");
const https = require("https");
const repoDetails = require("../utils/getRepoDetails");

const git = simpleGit("D:/CODING/cli-tools/git-sift");

/* 
    you can specify the path (folder) which you want its contents to be returned, eg. path = "src" will return the file contents of the src folder
*/
function listRepoContents(owner, repo, path = "") {
  // you can as well use axios for more simpler api handling
  /* 
        code:
        try{
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, 
            headers:{
            'User-Agent':'Node.js}
            )
            return response.data //axios will automatically parse JSON responses
        }catch{
            handle errors here
        }
    */
  return new Promise((resolve, reject) => {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    const options = {
      headers: { "User-Agent": "Node.js" },
    };

    https
      .get(apiUrl, options, (res) => {
        let data = "";
        //   event handler for data chunk
        res.on("data", (chunk) => (data += chunk));
        //   event handler for when the response ends
        res.on("end", () => {
          try {
            // parse the response data as JSON
            const contents = JSON.parse(data);
            resolve(contents);
          } catch (error) {
            reject(`Failed to parse API response: ${err.message}`);
          }
        });
      })
      .on("error", (err) => reject("Request failed: ", err.message));
  });
}

async function getRepositorySize() {
  try {
    const result = await git.raw(["count-objects", "-vH"]);
    console.log("Repository Size:");
    console.log(result);
  } catch (error) {
    console.error(`Failed to fetch repository size: ${error.message}`);
  }
}

// since the exec() is an async operation use promises which will either resolve or reject
function getRepositoryInformation(repoURL) {
  return new Promise((resolve, reject) => {
    exec(`git ls-remote ${repoURL}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Failed to fetch repository information: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
}

async function displayRepositoryInfo(repoURL) {
  try {
    const { owner, repo } = repoDetails(repoURL);

    console.log(`Repository name: ${repo}`);

    // TODO: implement repository content nesting for each directory if any
    
    const repoContents = await listRepoContents(owner, repo);
    console.log("Repository contents:");
    repoContents.forEach((item) => {
      console.log(
        `${item.type === "dir" ? "Directory" : "File"}: ${item.path}`
      );
    });

    await getRepositorySize();
    const repoInfo = await getRepositoryInformation(repoURL);
    console.log("Repository information:");
    console.log(repoInfo);
  } catch (error) {
    console.error(error);
  }
}

module.exports = displayRepositoryInfo;

/* 
 I encountered errors with using simple-git to get repository information, it had issues with ssh authentication and https protocol support. To solve this execute git command directly using node js's 'child_process'
 
*/

