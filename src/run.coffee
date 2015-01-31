{spawn} = require 'child_process'
fs = require 'fs'
path = require 'path'

Utils = require './utils'

module.exports =
  execute: (options) ->
    appConfig = Utils.getAppConfig()

    cmd = path.join(Utils.getRunnerPath(), 'script', 'run')
    args = ['-r', process.cwd(), '--app-config', JSON.stringify(appConfig)]

    console.log 'Running', cmd, args

    Utils.spawnCommand(cmd, args)
