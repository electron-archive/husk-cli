require("babel/register")

beforeEach(function() {
  jasmine.addMatchers({
    toEndWith: function(){
      return {
        compare: function(actual, expected) {
          var pass = actual.endsWith(expected)
          var notStr = pass ? ' not' : ''
          var message = "Expected string '#{actualValue}' to#{notStr} end with '#{expectedValue}'"
          return {pass: pass, message: message}
        }
      }
    },

    toHaveLength: function(){
      return {
        compare: function(actual, expectedValue){
          actualValue = actual.length
          pass = actualValue === expectedValue
          notStr = pass ? ' not' : ''
          message = "Expected array with length #{actualValue} to#{notStr} have length #{expectedValue}"
          return {pass: pass, message: message}
        }
      }
    }
  })
})
