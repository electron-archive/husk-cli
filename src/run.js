var path = require('path')
var Utils = require('./utils')

module.exports = {
  execute: function() {
    var appPath = Utils.getProjectPath()
    var cmd = path.join(appPath, 'node_modules', '.bin', 'electron')
    var args = [appPath, '--environment', 'development']
    console.log('Running', cmd, args)
    Utils.spawnCommand(cmd, args)
  }
}
