{spawn} = require 'child_process'
fs = require 'fs'
path = require 'path'

RunnerName = 'atom-shell-starter'

module.exports =
  execute: (options) ->
    runnerPath = path.join(process.cwd(), 'node_modules', RunnerName)
    try
      runnerPackageJson = require path.join(runnerPath, 'package.json')
    catch e
      console.error "You must be at the root of an #{RunnerName} project"
      return

    packageJsonPath = path.join(process.cwd(), 'package.json')
    packageJson = require(packageJsonPath)

    runCmd = path.join(runnerPath, 'script', 'run')
    args = ['-r', process.cwd()]

    console.log 'Running', runCmd, args

    run = spawn(runCmd, args)
    run.stdout.on 'data', (data) ->
      console.log data.toString()
    run.stderr.on 'data', (data) ->
      console.error data.toString()
