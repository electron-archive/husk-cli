{ArgumentParser} = require 'argparse'

###
This CLI is mainly for benchmarking. While there may be useful data output to
the console, it will probably change. The options will probably change as
well.
###
main = ->
  argParser = new ArgumentParser
    version: require('../package.json').version
    addHelp: true
    description: 'Make radium apps go'

  argParser.addArgument([ '-V', '--verbose' ], action: 'storeTrue')
  argParser.addArgument(['action'])

  options = argParser.parseArgs()

  console.log options

module.exports = {main}
