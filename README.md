## `grunt.mergeConfig(config)`
Adds `grunt.config.merge(config)` function, and alias `grunt.mergeConfig(config)`.

This allows you to organize your Grunt configuration by **feature**, instead of having a single giant
configuration organized by tasks.
Your Gruntfile will be easier to read, understand, and maintain.

## Example of an *organized* Gruntfile

    module.exports = function(grunt) {

      require('grunt-config-merge')(grunt);

      // Configure task defaults:
      grunt.mergeConfig({
        concat: { options: { process: true } },
        watch: { options: { atBegin: true, livereload: true } }
      });

      // Configure all JavaScript tasks:
      grunt.registerTask('build-js', [ 'concat:JS', 'jshint' ]);
      grunt.mergeConfig({
        concat: { 'JS': { files: allJS } },
        jshint: { 'JS': { files: allJS } },
        watch: { 'JS': { files: allJS, tasks: [ 'build-js' ] } }
      });

      // Configure all CSS tasks:
      grunt.registerTask('build-css', [ 'concat:CSS' ]);
      grunt.mergeConfig({
        concat: { 'CSS': { files: allCSS } },
        watch: { 'CSS': { files: allCSS, tasks: [ 'build-css' ] } }
      });


      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-watch');

    }



## Installation
Download and install via Node Package Manager:

    npm install --save-dev grunt-config-merge

Then add this line near the top of your Gruntfile:

    require('grunt-config-merge')(grunt);

And go ahead and start using `grunt.mergeConfig` instead of `grunt.initConfig`!
