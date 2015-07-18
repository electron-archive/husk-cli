{spawn} = require 'child_process'
fs = require 'fs'
path = require 'path'

Utils = require './utils'

module.exports =
  execute: (options) ->
    appPath = Utils.getProjectPath()
    cmd = path.join(appPath, 'node_modules', '.bin', 'electron')
    args = [
      appPath
      '--environment', 'development'
    ]

    console.log 'Running', cmd, args

    Utils.spawnCommand(cmd, args)
