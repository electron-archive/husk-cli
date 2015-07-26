var spawn = require('child_process').spawn
var path = require('path')
var RunnerName = 'electron-prebuilt'
var util = require('util')
require('colors')

module.exports = {
  getProjectPath: function() {
    return process.cwd()
  },

  getProjectPackageJSON: function() {
    if (this.projectPackageJSON != null)
      return this.projectPackageJSON
    this.projectPackageJSON = require(path.join(this.getProjectPath(), 'package.json'))
    return this.projectPackageJSON
  },

  getRunnerPath: function() {
    return path.join(this.getProjectPath(), 'node_modules', RunnerName)
  },

  getRunnerPacakageJSON: function() {
    return require(path.join(this.getRunnerPath(), 'package.json'))
  },

  spawnCommand: function(cmd, args, callback) {
    cmd = spawn(cmd, args, { stdio: 'inherit' })

    // The error is passed to the close callback, but this supresses the trace being printed.
    cmd.on('error', function() {})

    if (callback != null)
      cmd.on('close', callback)
    return cmd
  },

  logVerbose: function(argv) {
    if (!argv.v || argv.verbose) return
    let args = Array.prototype.slice.call(arguments, 1)
    args.unshift('[verbose]'.yellow)
    console.log(util.format.apply(util, args))
  },

  logWarning: function(options) {
    let argsStart = 0
    if (typeof options === 'object')
      argsStart = 1
    else
      options = {}

    let args = Array.prototype.slice.call(arguments, argsStart)
    args = util.format.apply(util, args)
    if (options.color) args = args.yellow
    console.warn(args)
  },

  logError: function(options) {
    let argsStart = 0
    if (typeof options === 'object')
      argsStart = 1
    else
      options = {}

    let args = Array.prototype.slice.call(arguments, argsStart)
    args = util.format.apply(util, args)
    if (options.color) args = args.red
    console.error(args)
  }
}
