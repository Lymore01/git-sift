const fs = require("fs");
const path = require("path");
const term = require("terminal-kit").terminal;


function readAsciiFromFile() {
  // file path
  const filePath = path
    .join(__dirname, "..", "assets", "logo.txt")
    .replace(/\\/g, "/"); // replace the backslashes with forward slash

  // read the txt file
  console.log(filePath);
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject("Error reading logo file:", err);
      }
      resolve(data);
    });
  });
}

async function printHeader() {
  try {
    const ascii = await readAsciiFromFile();
    term.bold.brightCyan(ascii);
    term.black("\n\n\n");
    term.cyan("    Welcome to Git Sift! \n");
    term.cyan("    Explore your repository like never before.\n");
    term.black("\n\n\n");
  } catch (error) {
    console.error(error);
  }
}

async function printCommands() {
  term.bold("   Commands:\n");
  term.yellow("     - clone <repo>")(" Clone a repository.\n");
  term.cyan("         Options:")("\n");
  term.green("          -s, --scan   Scan repository before cloning\n");
  term.yellow("     - status")(" Check the status of the repository.\n");
  term.cyan("         Options:")("\n");
  term.green("            -v, --verbose Show detailed status info.\n");
  term.yellow("     - info")(" Get information about the repository.\n");
  term.cyan("         Options:")("\n");
  term.green("            -d, --details Show detailed repo info.\n");
  term.black("\n\n\n");
}

async function printFooter() {
  term.bold("   For more information and help, visit:\n");
  term.cyan("   https://github.com/your-repo/git-sift\n");
  term.bold("   Contact:")(" kelly@gmail.com\n");
  term.processExit();
}

async function artEntry() {
  await printHeader();
  await printCommands();
  await printFooter();
}

module.exports = artEntry;
