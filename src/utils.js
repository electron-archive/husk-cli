var spawn = require('child_process').spawn
var path = require('path')
var RunnerName = 'electron-prebuilt'

module.exports = {
  atRootOfProject: function() {
    try {
      this.getRunnerPacakageJSON()
      return true
    } catch (e) {
      return false
    }
  },
  getProjectPath: function() {
    return process.cwd()
  },
  getProjectPackageJSON: function() {
    if (this.projectPackageJSON != null) {
      return this.projectPackageJSON
    }
    var packageJSONPath = path.join(this.getProjectPath(), 'package.json')
    return this.projectPackageJSON = require(packageJSONPath)
  },
  getRunnerPath: function() {
    return path.join(this.getProjectPath(), 'node_modules', RunnerName)
  },
  getRunnerPacakageJSON: function() {
    return require(path.join(this.getRunnerPath(), 'package.json'))
  },
  spawnCommand: function(cmd, args, callback) {
    cmd = spawn(cmd, args, {
      stdio: 'inherit'
    })
    if (callback != null) {
      cmd.on('close', callback)
    }
  }
}
