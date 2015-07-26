var spawn = require('child_process').spawn
var fs = require('fs')
var path = require('path')
var Utils = require('./utils')

module.exports = {
  execute: function(options) {
    var appPath = Utils.getProjectPath()
    var cmd = path.join(appPath, 'node_modules', '.bin', 'electron')
    var args = [appPath, '--environment', 'development']
    console.log('Running', cmd, args)
    Utils.spawnCommand(cmd, args)
  }
}
