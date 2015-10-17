var dependencies = [
	'stringutils'
]; 

define(dependencies, function() {
	
	/**
	 * dependencies
	 *
	 * 		jquery 	
	 * 		stroep.core.StringUtil.js
	 */
	
	var Template = function(src, reply) {
		
		return {
			source: src,
			render:function(params) {
				
				return params ? stroep.core.StringUtil.replaceVars(this.source, params) : this.source;
			}
		};
	};
	
	return Template;
	
});
