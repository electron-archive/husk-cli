{spawn} = require 'child_process'
fs = require 'fs'
path = require 'path'
async = require 'async'

Utils = require './utils'

module.exports =
  execute: (options) ->
    electronVersion = Utils.getRunnerPacakageJSON().version
    projectNodeModulesPath = path.join(Utils.getProjectPath(), 'node_modules')
    electronPrebuiltPath = path.join(projectNodeModulesPath, 'electron-prebuilt')

    async.waterfall [
      (callback) ->
        console.log 'Running npm install'
        Utils.spawnCommand 'npm', ['install'], (code) -> callback(code)
      (callback) ->
        cmd = path.join(__dirname, '..', 'node_modules', '.bin', 'electron-rebuild')
        args = [
          '--version', electronVersion,
          '--electron-prebuilt-dir', electronPrebuiltPath,
          '--module-dir', projectNodeModulesPath
        ]
        console.log 'Running', cmd, args
        Utils.spawnCommand cmd, args, -> callback()
    ]
