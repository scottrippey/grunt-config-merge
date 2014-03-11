
var grunt = require('grunt');
require('../grunt.config.merge.js')(grunt);

exports['merge_test'] = {
	"grunt.config.merge": function(test) {

		test.ok(typeof grunt.config.merge === 'function');
		test.ok(grunt.config.merge === grunt.mergeConfig);
		
		test.done();
	},
	"grunt.mergeConfig": function(test) {

		test.equal(grunt.config.get('test-data'), null, "config data starts off empty");
		
		var nestedObject = { '3': 'THREE' };
		grunt.mergeConfig({
			vars: {
				asdf: 'ASDF'
			}
		});
		grunt.mergeConfig({
			vars: {
				qwer: 'QWER'
				, zxcv: { one: 1 }
			},
			'test-data': {
				'one': 1, 'two': { 'TWO': 2 }, 'three': 3, 
				'four': '<%= vars.asdf %>', 'five': '<%= vars.zxcv %>',
				'six': { 'SIX': 6 }
			}
		});
		grunt.mergeConfig({
			vars: {
				zxcv: { two: 2 }
			},
			'test-data': {
				'two': 2, 'three': nestedObject,
				'six': [ 6 ],
				'seven': 7
			}
		});
		
		test.deepEqual(grunt.config.get('vars.asdf'), 'ASDF', "Data is initialized");
		test.deepEqual(grunt.config.get('vars.qwer'), 'QWER', "Data is merged");
		test.deepEqual(grunt.config.get('vars.zxcv.one'), undefined, "Nested data is overridden");
		test.deepEqual(grunt.config.get('vars.zxcv.two'), 2, "Nested data is overridden");
		test.deepEqual(grunt.config.get('vars.zxcv'), { two: 2 }, "Nested data is overridden");
		
		test.deepEqual(grunt.config.get('test-data.one'), 1, "Test data is merged");
		test.deepEqual(grunt.config.get('test-data.two'), 2, "Test data is merged");
		test.deepEqual(grunt.config.get('test-data.three'), nestedObject, "Test data is merged");
		test.equal(grunt.config.getRaw('test-data.three'), nestedObject, "Test data is merged");
		test.deepEqual(grunt.config.get('test-data.three.3'), 'THREE', "Test data is merged");
		test.deepEqual(grunt.config.get('test-data.four'), 'ASDF', "Test data is merged");
		test.deepEqual(grunt.config.get('test-data.five'), { two: 2 }, "Test data is merged");
		test.deepEqual(grunt.config.get('test-data.six'), [ 6 ], "Test data is merged");
		test.deepEqual(grunt.config.get('test-data.seven'), 7, "Test data is merged");
		
		test.done();
	}
};
