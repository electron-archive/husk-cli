{spawn} = require 'child_process'
fs = require 'fs'
path = require 'path'

Utils = require './utils'

module.exports =
  execute: (options) ->
    electronVersion = Utils.getRunnerPacakageJson().version
    projectNodeModulesPath = path.join(Utils.getProjectPath(), 'node_modules')
    electronPrebuiltPath = path.join(projectNodeModulesPath, 'electron-prebuilt')

    console.log 'Running', 'npm install'
    Utils.spawnCommand 'npm', ['install'], (code) ->
      if code is 0
        cmd = path.join(__dirname, '..', 'node_modules', '.bin', 'electron-rebuild')
        args = [
          '--version', electronVersion,
          '--electron-prebuilt-dir', electronPrebuiltPath,
          '--module-dir', projectNodeModulesPath
        ]
        console.log 'Running', cmd, args
        Utils.spawnCommand(cmd, args)
