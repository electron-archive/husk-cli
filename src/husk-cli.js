var ArgumentParser = require('argparse').ArgumentParser
var Utils = require('./utils')

var main = function() {
  var argParser, bootstrapArgs, buildArgs, options, runArgs, subparsers

  argParser = new ArgumentParser({
    version: require('../package.json').version,
    addHelp: true,
    description: 'Make electron apps go'
  })
  subparsers = argParser.addSubparsers({
    title: 'subcommands',
    dest: 'subcommand'
  })
  runArgs = subparsers.addParser('run', {
    addHelp: true
  })
  buildArgs = subparsers.addParser('build', {
    addHelp: true
  })
  buildArgs.addArgument(['-p', '--platform'])
  buildArgs.addArgument(['-a', '--arch'])
  bootstrapArgs = subparsers.addParser('bootstrap', {
    addHelp: true
  })
  options = argParser.parseArgs()
  if (!Utils.atRootOfProject()) {
    console.error("You must be at the root of your husk project")
    return
  }
  switch (options.subcommand) {
    case 'run':
      require('./run').execute(options)
      break
    case 'build':
      require('./build').execute(options)
      break
    case 'bootstrap':
      require('./bootstrap').execute(options)
      break
  }
}

module.exports = { main: main }
