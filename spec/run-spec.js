var path = require('path')
var Utils = require('../src/utils')
var runCommand = require('../src/husk-cli').runCommand

describe("run command", function(){
  it("runs the electron app in development mode by default", function(){
    spyOn(Utils, 'spawnCommand')
    spyOn(Utils, 'logWarning')
    spyOn(Utils, 'logError')
    runCommand('run', {_: ['run']})

    expect(Utils.spawnCommand).toHaveBeenCalled()

    let args = Utils.spawnCommand.calls.mostRecent().args
    args[2]() // the callback

    expect(args[0]).toEndWith(path.join('node_modules', '.bin', 'electron'))
    expect(args[1][1]).toBe('--environment')
    expect(args[1][2]).toBe('development')

    expect(Utils.logError).not.toHaveBeenCalled()
    expect(Utils.logWarning).not.toHaveBeenCalled()
  })

  it("logs an error when an error happens", function(){
    spyOn(Utils, 'spawnCommand')
    spyOn(Utils, 'logWarning')
    spyOn(Utils, 'logError')
    runCommand('run', {})

    expect(Utils.spawnCommand).toHaveBeenCalled()

    let args = Utils.spawnCommand.calls.mostRecent().args
    args[2](new Error) // the callback

    expect(Utils.logError).toHaveBeenCalled()
    expect(Utils.logWarning).toHaveBeenCalled()
  })

  it("overrides the environment when an environment is passed in", function(){
    spyOn(Utils, 'spawnCommand')
    runCommand('run', {environment: 'production'})

    expect(Utils.spawnCommand).toHaveBeenCalled()

    let args = Utils.spawnCommand.calls.mostRecent().args
    expect(args[0]).toEndWith(path.join('node_modules', '.bin', 'electron'))
    expect(args[1][1]).toBe('--environment')
    expect(args[1][2]).toBe('production')
    expect(args[1]).toHaveLength(3)
  })

  it("passes all other cli args through to the electron app", function(){
    spyOn(Utils, 'spawnCommand')
    runCommand('run', {_: ['run', 'another'], cats: 'wow'})

    expect(Utils.spawnCommand).toHaveBeenCalled()

    let args = Utils.spawnCommand.calls.mostRecent().args
    expect(args[0]).toEndWith(path.join('node_modules', '.bin', 'electron'))
    expect(args[1][1]).toBe('--environment')
    expect(args[1][2]).toBe('development')
    expect(args[1][3]).toBe('--cats')
    expect(args[1][4]).toBe('wow')
    expect(args[1][5]).toBe('another')
  })
})
