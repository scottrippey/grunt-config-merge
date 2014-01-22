module.exports = function(grunt) {
	grunt.config.merge = grunt.mergeConfig = function(gruntConfig) {
		return grunt.util._.merge(grunt.config.data, gruntConfig);
	};
};
