{spawn} = require 'child_process'
path = require 'path'

RunnerName = 'electron-prebuilt'

module.exports =
  atRootOfProject: ->
    try
      @getRunnerPacakageJSON()
      return true
    catch e
      return false

  getProjectPath: ->
    process.cwd()

  getProjectPackageJSON: ->
    return @projectPackageJSON if @projectPackageJSON?
    packageJSONPath = path.join(@getProjectPath(), 'package.json')
    @projectPackageJSON = require(packageJSONPath)

  getRunnerPath: ->
    path.join(@getProjectPath(), 'node_modules', RunnerName)

  getRunnerPacakageJSON: ->
    require path.join(@getRunnerPath(), 'package.json')

  spawnCommand: (cmd, args, callback) ->
    cmd = spawn(cmd, args, {stdio: 'inherit'})
    cmd.on('close', callback) if callback?
