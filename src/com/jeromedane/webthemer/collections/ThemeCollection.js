
var dependencies = [
	'app/models/ThemeModel'
];

define(dependencies, function(ThemeModel) {
	
	var ThemeCollection = Backbone.Collection.extend({
		
		// Reference to this collection's model.
		model: ThemeModel
		
	});
	return ThemeCollection;
});