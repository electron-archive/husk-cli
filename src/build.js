var fs = require('fs')
var path = require('path')
var async = require('async')
var Utils = require('./utils')

var compileApp = function(options, callback) {
  var projectPath = Utils.getProjectPath()
  var projectPackageJSON = Utils.getProjectPackageJSON()
  var compileCacheDir = path.join(projectPath, projectPackageJSON.compileCacheDir || 'compile-cache')
  var compileDirs = projectPackageJSON.compileDirs

  if (!Array.isArray(compileDirs))
    compileDirs = ['src']

  for (var i = 0; i < compileDirs.length; i++)
    compileDirs[i] = path.join(projectPath, compileDirs[i])

  var cmd = path.join(projectPath, 'node_modules', '.bin', 'electron-compile')
  if (fs.existsSync(cmd)) {
    var args = ['--target', compileCacheDir].concat(compileDirs)
    console.log('Running', cmd, args)
    Utils.spawnCommand(cmd, args, callback)
  } else {
    callback()
  }
}

var packageApp = function(options, callback) {
  var projectPath = Utils.getProjectPath()
  var projectPackageJSON = Utils.getProjectPackageJSON()
  var electronVersion = Utils.getRunnerPacakageJSON().version
  var pathsToIgnore = [
    path.join('node_modules', 'electron-compile', 'node_modules', 'electron-compilers'),
    path.join('node_modules', 'husk-cli'),
    path.join('node_modules', '\\.bin')
  ]
  var arch = options.arch || 'x64'
  var platform = options.platform || 'darwin'
  var cmd = path.join(__dirname, '..', 'node_modules', '.bin', 'electron-packager')
  var args = [
    projectPath,
    projectPackageJSON.appName,
    '--overwrite',
    '--platform', platform,
    '--arch', arch,
    '--version', electronVersion,
    '--out', path.join(projectPath, 'release'),
    '--ignore', pathsToIgnore.join('|')
  ]
  console.log('Running', cmd, args)
  Utils.spawnCommand(cmd, args, callback)
}

var execute = function(options) {
  async.waterfall([
    function(callback) {
      compileApp(options, callback)
    }, function(callback) {
      packageApp(options, callback)
    }
  ])
}

module.exports = { execute: execute }
