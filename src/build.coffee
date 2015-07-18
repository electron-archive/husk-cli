{spawn} = require 'child_process'
fs = require 'fs'
path = require 'path'
async = require 'async'

Utils = require './utils'

execute = (options) ->
  async.waterfall [
    (callback) -> compileApp(options, callback)
    (callback) -> packageApp(options, callback)
  ]

compileApp = (options, callback) ->
  projectPath = Utils.getProjectPath()
  projectPackageJSON = Utils.getProjectPackageJSON()
  compileCacheDir = path.join(projectPath, projectPackageJSON.compileCacheDir ? 'compile-cache')

  cmd = path.join(projectPath, 'node_modules', '.bin', 'electron-compile')
  args = [
    '--target', compileCacheDir
    './src', './styles', './static'
  ]

  console.log 'Running', cmd, args

  Utils.spawnCommand(cmd, args, callback)

packageApp = (options, callback) ->
  projectPath = Utils.getProjectPath()
  projectPackageJSON = Utils.getProjectPackageJSON()
  electronVersion = Utils.getRunnerPacakageJSON().version

  pathsToIgnore = [
    path.join('node_modules', 'electron-compile', 'node_modules', 'electron-compilers')
    path.join('node_modules', 'husk-cli')
    path.join('node_modules', '\\.bin')
  ]

  cmd = path.join(__dirname, '..', 'node_modules', '.bin', 'electron-packager')
  args = [
    projectPath, projectPackageJSON.appName,
    '--overwrite'
    '--platform', options.platform ? 'darwin',
    '--arch', options.arch ? 'x64',
    '--version', electronVersion
    '--out', path.join(projectPath, 'release')
    '--ignore', pathsToIgnore.join('|')
  ]

  console.log 'Running', cmd, args

  Utils.spawnCommand(cmd, args, callback)

module.exports = {execute}
