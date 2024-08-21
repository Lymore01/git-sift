const os = require("os-utils");
const commander = require("commander");
const term = require('terminal-kit').terminal;

const program = new commander.Command();

// a promise returns an object which need to be awaited on to retrieve the results
function getPcHealth() {
    // we use a promise to handle async function "os.cpuUsage(callBack - resolves with the cpu usage object)"
  return new Promise((resolve) => {
    os.cpuUsage((cpuPercent) => {
      resolve({
        cpu: `${(cpuPercent * 100).toFixed(2)}%`,
        freeMemory: `${(os.freememPercentage() * 100).toFixed(2)}%`,
        totalMemory: `${(os.totalmem() / 1024).toFixed(2)} MB`,
        freeMemoryInMB: `${(os.freemem() / 1024).toFixed(2)} MB`,
        diskUsage: "Not Implemented",
      });
    });
  });
}

function terminalBeauty(pcHealth){
    term.clear();
    term.moveTo(1, 1);
    term.brightWhite('PC Health Report:\n\n');
    term.green('CPU Usage: ').cyan(pcHealth.cpu + '\n');
    term.green('Free Memory: ').cyan(pcHealth.freeMemory + '\n');
    term.green('Total Memory: ').cyan(pcHealth.totalMemory + '\n');
    term.green('Free Memory (MB): ').cyan(pcHealth.freeMemoryInMB + '\n');
    term.green('Disk Usage: ').cyan(pcHealth.diskUsage + '\n');
    term.brightWhite('\nReport complete.\n');
}

program
    .command('check-health') // the command ie. node index.js check-health
    .description("Check pc health") // this is going to be displayed when a user concat '?' at the end of the command 
    .action(async () =>{
        try {
            const pcHealth = await getPcHealth();
           
            terminalBeauty(pcHealth)

          } catch (error) {
            term.red('Error: ').brightWhite(error.message);
          }
          term.processExit(); 
    })

program.parse(process.argv)

