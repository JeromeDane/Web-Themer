com.jeromedane.webthemer.views = com.jeromedane.webthemer.views || {};

com.jeromedane.webthemer.views.InstalledThemesView = Backbone.View.extend({
	
	// Instead of generating a new element, bind to the existing skeleton of
	// the App already present in the HTML.
	el: '#content',
	
	initialize:function() {
		// this.render();
	},
	
	setTemplate:function(id) {
		var html = $('#' + id).html();
		this.template = new com.jeromedane.Template(html);	
	},
	
	render:function() {
		this.$el.html('');
		this.$el.html(this.template.render());

		var themesCollection = Themer.getThemeCollection(); 

		// render theme list			
		new com.jeromedane.webthemer.views.ThemeListView({ 
			collection:  themesCollection
		});
		
		$('#newThemeButton').click(function() {
			var theme = new com.jeromedane.webthemer.models.ThemeModel();
			
			themesCollection.add(theme);
			Themer.saveData();
		});		
				
	}
	
});
