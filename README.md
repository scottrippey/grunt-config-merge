# Update: This plugin is now included natively in Grunt v0.4.5+

Starting in Grunt v0.4.5, they've merged this plugin into the root library!  
This means that this plugin is now obsolete.  
Please use the native `grunt.config.merge` instead!  


Unfortunately, though, they did not include the alias `grunt.mergeConfig`.  
In my opinion, `mergeConfig` symbolizes that it's a replacement for `initConfig`, and helps readability.  
So, if you agree, you can simply add the following line of code to the top of your Gruntfile.js:  

    grunt.mergeConfig = grunt.config.merge;



## Organize your Gruntfile by *feature*

Adds `grunt.mergeConfig(...)`, which replaces `grunt.initConfig(...)`,
and enables you to
[**organize your Gruntfile by feature**](http://www.javapractices.com/topic/TopicAction.do?Id=205),
rather than by task.

## Example:

Gruntfile.js

```js
module.exports = function(grunt) {

  require('grunt-config-merge')(grunt);



  // Default options:
  grunt.mergeConfig({
    concat: { options: { process: true } },
    watch: { options: { atBegin: true, livereload: true } }
  });



  // JavaScripts:
  grunt.registerTask('build-js', [ 'concat:JS', 'jshint' ]);
  grunt.mergeConfig({
    concat: { 'JS': { files: allJS } },
    jshint: { 'JS': { files: allJS } },
    watch: { 'JS': { files: allJS, tasks: [ 'build-js' ] } }
  });



  // CSS:
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

  require('./build-defaults.js')(grunt);
  require('./build-js.js')(grunt);
  require('./build-css.js')(grunt);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

};
```

build-css.js:

```js
module.exports = function(grunt) {

  // CSS:
  grunt.registerTask('build-css', [ 'concat:CSS' ]);
  grunt.mergeConfig({
    concat: { 'CSS': { files: allCSS } },
    watch: { 'CSS': { files: allCSS, tasks: [ 'build-css' ] } }
  });

};
```

build-js.js:

```js
module.exports = function(grunt) {

  // JavaScripts:
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
