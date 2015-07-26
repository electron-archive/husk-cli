let path = require('path')
let Utils = require('./utils')

let HandledOptions = ['_', 'environment']

module.exports = {
  execute: function(argv) {
    var appPath = Utils.getProjectPath()
    var cmd = path.join(appPath, 'node_modules', '.bin', 'electron')
    var args = [appPath, '--environment', argv.environment || 'development']

    for (var key in argv){
      if (HandledOptions.indexOf(key) > -1) continue
      args.push(`--${key}`)
      args.push(argv[key])
    }

    if (argv._)
      for (var value of argv._) {
        if (value === 'run') continue
        args.push(value)
      }

    Utils.logVerbose(argv, 'Running', cmd, args)
    Utils.spawnCommand(cmd, args, function(err) {
      if (err){
        Utils.logError({color: true}, `"${cmd}" not found.`)
        Utils.logWarning({color: true}, `Make sure your're in a husk app and you have run '${argv.$0} bootstrap'`)
      }
    })
  }
}
