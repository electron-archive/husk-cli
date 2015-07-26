var spawn = require('child_process').spawn
var fs = require('fs')
var path = require('path')
var async = require('async')
var Utils = require('./utils')

module.exports = {
  execute: function(options) {
    var electronVersion = Utils.getRunnerPacakageJSON().version
    var projectNodeModulesPath = path.join(Utils.getProjectPath(), 'node_modules')
    var electronPrebuiltPath = path.join(projectNodeModulesPath, 'electron-prebuilt')

    async.waterfall([
      function(callback) {
        console.log('Running npm install')
        return Utils.spawnCommand('npm', ['install'], function(code) {
          callback(code)
        })
      }, function(callback) {
        var args, cmd
        cmd = path.join(__dirname, '..', 'node_modules', '.bin', 'electron-rebuild')
        args = ['--version', electronVersion, '--electron-prebuilt-dir', electronPrebuiltPath, '--module-dir', projectNodeModulesPath]
        console.log('Running', cmd, args)
        return Utils.spawnCommand(cmd, args, function() {
          callback()
        })
      }
    ])
  }
}
