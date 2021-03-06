var dependencies = [
	'themer',
	'app/views/ThemeRowView'
];
define(dependencies, function(Themer, ThemeRowView) {

	var ThemeListView = Backbone.View.extend({
		
		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#themeList',
		
		initialize:function() {
			
			if(!this.collection) {
				this.collection = Themer.getThemeCollection();
			}
			
			// Cache the template function for a single product.
			this.collection.bind('add', this.render, this);
			this.collection.bind('remove', this.render, this);
			
			this.render();
		},
		
		render:function() {

			this.$el.html('');
			
			_.each(this.collection.models, function(theme) {

				var view = new ThemeRowView({ 
					model:theme
				});

				this.$el.append(view.render().el);				
				
			}, this);
			
		}
		
	});
	
	return ThemeListView;
});