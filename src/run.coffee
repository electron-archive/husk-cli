{spawn} = require 'child_process'
fs = require 'fs'
path = require 'path'

Utils = require './utils'

module.exports =
  execute: (options) ->
    appConfig = Utils.getAppConfig()

    cmd = path.join(Utils.getRunnerPath(), 'script', 'run')
    args = ['--app-config', JSON.stringify(appConfig)]
    args.push('-t') if options.test
    args = args.concat ['-r', process.cwd()] if options.dev or options.test

    console.log 'Running', cmd, args

    Utils.spawnCommand(cmd, args)
