const readline = require("readline");
const term = require("terminal-kit").terminal;
const handleCliCommands = require("../utils/commander");


async function handleCommands(command) {
  switch (command.trim()) {
    case "help":
      term.green("Available commands:\n");
      term.cyan(" - help: Show available commands.\n");
      term.cyan(" - exit: Exit the CLI.\n");
      break;
    case "exit":
      term.green("Good Bye \n");
      process.exit(0);
    default:
      await handleCliCommands(command.trim())
  }
}

async function cli() {
  const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
    prompt: "git-sift> ",
  });

  rl.prompt();

  rl.on("line", async(line) => {
    await handleCommands(line);
    rl.prompt(); 
  }).on("close", () => {
    term.green("Exiting CLI...\n");
    process.exit(0);
  });
}

module.exports = cli;
