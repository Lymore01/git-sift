const https = require("https");

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
  // handle nesting inside the main function
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
        res.on("end", async () => {
          try {
            const contents = JSON.parse(data);

            for (const item of contents) {
              if (item.type === "dir") {
                // the function call's itself to fetch subdirectories contents
                item.contents = await listRepoContents(owner, repo, item.path);
              } else if (item.type === "file") {
                fetchFileContents(item.download_url)
                  .then((contents) => {
                    item.fileContent = contents;
                  })
                  .catch((err) => console.error(err));
              }
            }
            resolve(contents);
          } catch (error) {
            reject(`Failed to parse API response: ${error.message}`);
          }
        });
      })
      .on("error", (err) => reject("Request failed: ", err.message));
  });
}

// download url
function fetchFileContents(fileUrl) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: { "User-Agent": "Node.js" },
    };
    https
      .get(fileUrl, options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(data);
          } catch (error) {
            reject(`Failed to parse API response: ${error.message}`);
          }
        });
      })
      .on("error", (err) => reject("Request failed: ", err.message));
  });
}

// structure for the nested components

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

function fetchAllDependencies(
  owner,
  repo,
  apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/package-lock.json`
) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: { "User-Agent": "Node.js" },
    };
    https
      .get(apiUrl, options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));

        res.on("end", async () => {
          try {
            const response = JSON.parse(data);
            const downloadUrl = response.download_url;
            if (downloadUrl) {
              https
                .get(downloadUrl, options, (res) => {
                  let packageData = "";
                  res.on("data", (chunk) => (packageData += chunk));
                  res.on("end", () => {
                    try {
                      const packagesData = JSON.parse(packageData);
                      resolve(packagesData.packages);
                    } catch (error) {
                      reject("Error: ", error);
                    }
                  });
                })
                .on("error", (err) => {
                  reject("Error parsing packages: ", err);
                });
            } else {
              reject("No download URL found for package-lock.json");
            }
          } catch (error) {
            reject(`Error fetching or parsing response: ${error.message}`);
          }
        });
      })
      .on("error", (err) => reject("Request failed: ", err.message));
  });
}


module.exports = {
  listRepoContents,
  fetchFileContents,
  getRepositoryInformation,
  fetchAllDependencies
};
