module.exports = function (grunt) {
  grunt.initConfig({
    mochacli: {
      options: {
        bail: true
      },
      all: ['test/**/*.test.js']
    }
  });
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.registerTask('test', ['mochacli']);
};