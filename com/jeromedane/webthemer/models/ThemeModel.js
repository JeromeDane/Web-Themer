
var dependencies = [
];

define(dependencies, function() {
	
	var ThemeModel = Backbone.Model.extend({
		
		defaults: {
			name: "Theme Name",
			urlPattern:"https?:\\/\\/.*",
			css:"",
			enabled:true
		},
		
		initialize:function() {
			this.bind("remove", function() {
			  this.destroy();
			});
		},
		
		toggleTested: function(){
			this.set('tested', !this.get('tested'));
		}
	
	});	
	
	return ThemeModel;
	
});
