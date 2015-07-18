{spawn} = require 'child_process'
path = require 'path'

RunnerName = 'electron-prebuilt'

module.exports =
  atRootOfProject: ->
    try
      @getRunnerPacakageJson()
      return true
    catch e
      return false

  getRunnerPath: ->
    path.join(@getProjectPath(), 'node_modules', RunnerName)

  getProjectPath: ->
    process.cwd()

  getRunnerPacakageJson: ->
    require path.join(@getRunnerPath(), 'package.json')

  getApppackageJSON: ->
    return @apppackageJSON if @apppackageJSON?
    packageJSONPath = path.join(process.cwd(), 'package.json')
    @apppackageJSON = require(packageJSONPath)

  getAppConfig: ->
    projectPath = @getProjectPath()
    packageJSON = @getApppackageJSON()

    paths =
      root: projectPath
      src: 'src'

    {paths, packageJSON}

  spawnCommand: (cmd, args, callback) ->
    cmd = spawn(cmd, args, {stdio: 'inherit'})
    cmd.on('close', callback) if callback?
