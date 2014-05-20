module.exports = function(grunt) {

	grunt.config.merge = grunt.mergeConfig = function(gruntConfig) {
    recursiveMerge(gruntConfig, []);
	};

  function recursiveMerge(object, namespaceStack) {
    namespaceStack.push(null);
    for (var p in object) {
      if (!object.hasOwnProperty(p)) continue;

      namespaceStack[namespaceStack.length - 1] = p;

      var newValue = object[p]
        , existingValue = grunt.config.getRaw(namespaceStack)
	    , needsDeepMerge = isPlainObject(newValue) && isPlainObject(existingValue);
	    
      if (newValue === existingValue) {
        // Skip
      } else if (needsDeepMerge) {
        recursiveMerge(newValue, namespaceStack);
      } else {
        grunt.config.set(namespaceStack, newValue);
      }
    }
    namespaceStack.pop();
  }
	
  function isPlainObject(obj) {
	  return Object.prototype.toString.call(obj) === '[object Object]';
  }
};
