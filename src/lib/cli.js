const readline = require("readline");
const term = require("terminal-kit").terminal;

function handleCommands(command) {
    // trim to remove white spaces before and after the command
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
        term.red(`Unknown command: ${command.trim()}\n`);
    }
  }
// create readline interface
function cli() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "git-sift> ",
  });

  rl.prompt();

  rl.on("line", (line) => {
    handleCommands(line);
    rl.prompt(); // Keep the prompt active
  }).on("close", () => {
    term.green("Exiting CLI...\n");
    process.exit(0);
  });
}

module.exports = cli;
