module.exports = function(grunt) {
	
	grunt.registerTask('default', [ 'tests' ]);
	grunt.registerTask('tests', [ 'nodeunit' ]);
	
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	
	grunt.initConfig({
		nodeunit: {
			all: [ 'tests/*.js' ]
		}
	});
	
	
};