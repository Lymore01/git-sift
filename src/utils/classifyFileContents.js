
const fetchPythonPackagesUsed = require("../commands/fetchPythonPackagesUsed");


async function classifyFileContents(contents) {
  const javascriptPatterns = /\b(function|const|let|var|=>|console\.log)\b/;
  const pythonPatterns = /\b(def|import|print|lambda|class)\b/;

  if (pythonPatterns.test(contents)) {
    return await fetchPythonPackagesUsed(contents);
  } else if (javascriptPatterns.test(contents)) {
    return "javascript"
  } else {
    return "none";
  }
}

module.exports = classifyFileContents;
