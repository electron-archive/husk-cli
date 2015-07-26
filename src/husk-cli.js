let yargs = require('yargs')
var Utils = require('./utils')

let runCommand = function(command, argv) {
  Utils.logVerbose(argv, 'Command:', command, argv);
  require(`./${command}`).execute(argv)
}

let main = function() {
  let argv = yargs.usage("$0 command")
    .command("run", "Run your electron app", function(yargs) {
      runCommand('run', yargs.argv)
    })
    .command("build", "Build your electron app for distribution", function(yargs) {
      runCommand('build', yargs.argv)
    })
    .command("bootstrap", "Install dependencies and build native modules against electron", function(yargs) {
      runCommand('bootstrap', yargs.argv)
    })
    .demand(1, "Must provide a valid command")
    .help("h")
    .alias("h", "help")
    .alias("v", "verbose")
    .argv

  if (['run', 'build', 'bootstrap'].indexOf(argv._[0]) < 0){
    yargs.showHelp()
    console.error('Invalid command: ' + argv._[0]);
  }
}

module.exports = { main: main, runCommand: runCommand }
