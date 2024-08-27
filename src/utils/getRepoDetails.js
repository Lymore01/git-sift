const url = require('url')



async function getRepoDetails(repoURL){
    const parsedURL = url.parse(repoURL)
    const pathSegments = parsedURL.pathname.split('/')
    const owner = pathSegments[1];
    const repo = pathSegments[2].replace('.git', '');
    return {owner, repo}
}


module.exports = getRepoDetails;