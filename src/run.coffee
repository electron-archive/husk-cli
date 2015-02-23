{spawn} = require 'child_process'
fs = require 'fs'
path = require 'path'

Utils = require './utils'

module.exports =
  execute: (options) ->
    appConfig = Utils.getAppConfig()

    cmd = path.join(Utils.getRunnerPath(), 'script', 'run')
    args = ['--app-config', JSON.stringify(appConfig)]
    args = args.concat ['-d', '-r', process.cwd()] if options.dev

    console.log 'Running', cmd, args

    Utils.spawnCommand(cmd, args)
