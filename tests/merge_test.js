
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
				, zxcv: { one: 1, two: "TWO" }
			},
			'test-data': {
				'one': 1, 'two': { 'TWO': 2 }, 'three': 3,
				'four': '<%= vars.asdf %>', 'five': '<%= vars.zxcv %>',
				'six': { 'SIX': 6 },
				'seven': { a: /./, b: null, c: {}, d: /./ }
			}
		});
		grunt.mergeConfig({
			vars: {
				zxcv: { two: 2, three: 3 }
			},
			'test-data': {
				'zero': 0,
				'two': 2, 'three': nestedObject,
				'six': [ 6 ],
				'seven': { a: null, b: /./, c: /./, d: { } },
			}
		});
		
		test.deepEqual(grunt.config.get('vars.asdf'), 'ASDF', "Data is initialized");
		test.deepEqual(grunt.config.get('vars.qwer'), 'QWER', "Data is merged");
		test.deepEqual(grunt.config.get('vars.zxcv.one'), 1, "Nested data is deep-merged");
		test.deepEqual(grunt.config.get('vars.zxcv.two'), 2, "Nested data is overridden");
		test.deepEqual(grunt.config.get('vars.zxcv.three'), 3, "Nested data is deep-merged");
		test.deepEqual(grunt.config.get('vars.zxcv'), { one: 1, two: 2, three: 3 }, "Nested data is merged");

		test.deepEqual(grunt.config.get('test-data.zero'), 0, "New data is added");
		test.deepEqual(grunt.config.get('test-data.one'), 1, "Old data persists");
		test.deepEqual(grunt.config.get('test-data.two'), 2, "Existing data is overridden");
		test.deepEqual(grunt.config.get('test-data.three'), nestedObject, "Nested objects are copied");
		test.equal(grunt.config.getRaw('test-data.three'), nestedObject, "Nested objects are efficiently merged, without creating new objects if unnecessary");
		test.deepEqual(grunt.config.get('test-data.three.3'), 'THREE', "Test data is merged");
		test.deepEqual(grunt.config.get('test-data.four'), 'ASDF', "Test data is merged");
		test.deepEqual(grunt.config.get('test-data.five'), { one: 1, two: 2, three: 3 }, "Templates work within the merge");
		test.deepEqual(grunt.config.get('test-data.six'), [ 6 ], "Incompatible objects are overridden, not merged");
		test.deepEqual(grunt.config.get('test-data.seven'), { a: null, b: /./, c: /./, d: { } } , "Non-objects are overwritten, not merged");
		
		test.done();
	}
};
