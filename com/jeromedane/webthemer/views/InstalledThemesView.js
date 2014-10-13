var dependencies = [
	'themer',
	'template',
	'app/views/ThemeListView',
	'app/models/ThemeModel'
];
define(dependencies, function(Themer, Template, ThemeListView, ThemeModel) {
	
	var View = Backbone.View.extend({
		
		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#content',
		
		initialize:function() {
			this.template = new Template($('#installed-themes-template').html());
		//	this.render();
		},
		
		render:function() {
			
			this.$el.html('');
			this.$el.html(this.template.render());
	
			var themesCollection = Themer.getThemeCollection(); 
	
			// render theme list			
			new ThemeListView({ 
				collection:  themesCollection
			});
			
			$('#newThemeButton').click(function() {
				var theme = new ThemeModel();
				
				themesCollection.add(theme);
				Themer.saveData();
				
				Views.editor.model = theme;
				Views.editor.render();
				
			});		
					
		}
		
	});
	
	return View;
});