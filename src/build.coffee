{spawn} = require 'child_process'
fs = require 'fs'
path = require 'path'

Utils = require './utils'

module.exports =
  execute: (options) ->
    projectPath = Utils.getProjectPath()
    projectPackageJSON = Utils.getProjectPackageJSON()
    electronVersion = Utils.getRunnerPacakageJSON().version

    cmd = path.join(__dirname, '..', 'node_modules', '.bin', 'electron-packager')
    args = [
      projectPath, projectPackageJSON.appName,
      '--overwrite'
      '--platform', options.platform ? 'darwin',
      '--arch', options.arch ? 'x64',
      '--version', electronVersion
      '--out', path.join(projectPath, 'release')
    ]

    console.log 'Running', cmd, args

    Utils.spawnCommand(cmd, args)
