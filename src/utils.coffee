{spawn} = require 'child_process'
path = require 'path'

RunnerName = 'atom-shell-starter'

module.exports =
  atRootOfProject: ->
    try
      @getRunnerPacakageJson()
      return true
    catch e
      return false

  getRunnerPath: ->
    path.join(process.cwd(), 'node_modules', RunnerName)

  getRunnerPacakageJson: ->
    require path.join(@getRunnerPath(), 'package.json')

  getAppPackageJson: ->
    return @appPackageJson if @appPackageJson?
    packageJsonPath = path.join(process.cwd(), 'package.json')
    @appPackageJson = require(packageJsonPath)

  getAppConfig: ->
    appPackageJson = @getAppPackageJson()
    {name, author, version, productName, iconUrl} = appPackageJson
    {name, author, version, productName, iconUrl}

  spawnCommand: (cmd, args) ->
    cmd = spawn(cmd, args)
    cmd.stdout.on 'data', (data) ->
      process.stdout.write data.toString()
    cmd.stderr.on 'data', (data) ->
      process.stdout.write data.toString()
