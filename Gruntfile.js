module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      all: ['Gruntfile.js', 'src/**/*.js']
    },

    watch: {
      scripts: {
        files: ['src/*.js'],
        tasks: ['default'],
        options: {
          spawn: false
        },
      },
    },

    shell: {
      test: {
        command: 'node_modules/.bin/jasmine',
        options:{
          stdout: true,
          stderr: true,
          failOnError: true
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-shell')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-jshint')

  grunt.registerTask('clean', function() { require('rimraf').sync('lib') })
  grunt.registerTask('lint', ['jshint'])
  grunt.registerTask('default', ['lint', 'babel'])
  grunt.registerTask('test', ['default', 'shell:test'])
}
