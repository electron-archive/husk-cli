{ArgumentParser} = require 'argparse'

Utils = require './utils'

main = ->
  argParser = new ArgumentParser
    version: require('../package.json').version
    addHelp: true
    description: 'Make electron apps go'

  subparsers = argParser.addSubparsers
    title: 'subcommands'
    dest: 'subcommand'

  runArgs = subparsers.addParser('run', addHelp: true)
  buildArgs = subparsers.addParser('build', addHelp: true)
  buildArgs.addArgument([ '-p', '--platform' ])
  buildArgs.addArgument([ '-a', '--arch' ])
  bootstrapArgs = subparsers.addParser('bootstrap', addHelp: true)

  options = argParser.parseArgs()

  unless Utils.atRootOfProject()
    console.error "You must be at the root of your husk project"
    return

  switch options.subcommand
    when 'run'
      require('./run').execute(options)
    when 'build'
      require('./build').execute(options)
    when 'bootstrap'
      require('./bootstrap').execute(options)

module.exports = {main}
