var Utils = require('../src/utils')
var runCommand = require('../src/husk-cli').runCommand

describe("run command", function(){
  it("runs the electron app", function(){
    spyOn(Utils, 'spawnCommand')
    runCommand('run')

    expect(Utils.spawnCommand).toHaveBeenCalled()
  })
})
