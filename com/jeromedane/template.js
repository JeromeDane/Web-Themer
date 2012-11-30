/**
 * dependencies
 *
 * 		jquery 	
 * 		stroep.core.StringUtil.js
 */

var com = com || {};
com.jeromedane = com.jeromedane || {};

com.jeromedane.Template = function(src, reply) {
	
	return {
		source:src,
		render:function(params) {
			
			return params ? stroep.core.StringUtil.replaceVars(this.source, params) : this.source;
		}
	}
	
}
