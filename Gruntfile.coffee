module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    babel: {
      options: {
        sourceMap: false
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.js'],
          dest: "lib",
          ext: ".js"
        }]
      }
    }

    watch: {
      scripts: {
        files: ['src/*.js'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
    },

    shell:
      test:
        command: 'jasmine-focused --captureExceptions --coffee spec/'
        options:
          stdout: true
          stderr: true
          failOnError: true

  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-shell')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask 'clean', -> require('rimraf').sync('lib')
  # grunt.registerTask('lint', ['coffeelint:src', 'coffeelint:test'])
  grunt.registerTask('default', ['babel'])
  grunt.registerTask('test', ['default', 'shell:test'])
