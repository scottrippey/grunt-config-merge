## Organize your Gruntfile by *feature*

Adds `grunt.config.merge(config)` function, and alias `grunt.mergeConfig(config)`,
helping you [organize your Gruntfile by feature](http://www.javapractices.com/topic/TopicAction.do?Id=205), rather than by task.

## Example:

Gruntfile.js

```js
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

};
```

## And then, easily split your Gruntfile into separate files!

Gruntfile.js:
```js
module.exports = function(grunt) {

  require('grunt-config-merge')(grunt);

  require('./config-defaults.js')(grunt);
  require('./config-javascripts.js')(grunt);
  require('./config-css.js')(grunt);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

};
```

config-javascripts.js:

```js
module.exports = function(grunt) {

  // Configure all JavaScript tasks:
  grunt.registerTask('build-js', [ 'concat:JS', 'jshint' ]);
  grunt.mergeConfig({
    concat: { 'JS': { files: allJS } },
    jshint: { 'JS': { files: allJS } },
    watch: { 'JS': { files: allJS, tasks: [ 'build-js' ] } }
  });

};
```

Etc...


## Installation

Download and install via Node Package Manager:

    npm install --save-dev grunt-config-merge

Then add this line near the top of your Gruntfile:

    require('grunt-config-merge')(grunt);

And go ahead and start using `grunt.mergeConfig` instead of `grunt.initConfig`!
