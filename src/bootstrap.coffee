{spawn} = require 'child_process'
fs = require 'fs'
path = require 'path'

Utils = require './utils'

module.exports =
  execute: (options) ->
    cmd = path.join(Utils.getRunnerPath(), 'script', 'bootstrap')
    args = []
    console.log 'Running', cmd, args
    Utils.spawnCommand(cmd, args)
