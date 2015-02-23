{ArgumentParser} = require 'argparse'

Utils = require './utils'

main = ->
  argParser = new ArgumentParser
    version: require('../package.json').version
    addHelp: true
    description: 'Make radium apps go'

  argParser.addArgument([ '-V', '--verbose' ], action: 'storeTrue')
  argParser.addArgument(['action'])

  options = argParser.parseArgs()

  unless Utils.atRootOfProject()
    console.error "You must be at the root of your husk project"
    return

  switch options.action
    when 'run'
      require('./run').execute(options)
    when 'build'
      require('./build').execute(options)
    when 'bootstrap'
      require('./bootstrap').execute(options)

module.exports = {main}
