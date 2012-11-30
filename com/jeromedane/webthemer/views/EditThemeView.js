com.jeromedane.webthemer.views = com.jeromedane.webthemer.views || {};

com.jeromedane.webthemer.views.EditThemeView = Backbone.View.extend({
		
	// Instead of generating a new element, bind to the existing skeleton of
	// the App already present in the HTML.
	el: '#content',
	
	initialize:function() {
		this.template = new com.jeromedane.Template($('#theme-editor-template').html());
	},
	
	events : {
		'click #saveThemesButton' : 'save_theme',
		'click #deleteThemeButton' : 'delete_theme',
		'click #cancelEditThemeButton' : 'cancel'
	},
	save_theme: function(e) {
		this.model.set('name', $('#edit_theme_name').val());
		this.model.set('urlPattern', $('#edit_theme_urlPattern').val());
		this.model.set('css', this.editor.getValue());
		
		com.jeromedane.webthemer.Themer.saveData();
		
		Views.installedThemes.render();
		
	},
	delete_theme: function(e) {
		if(confirm("Are you sure you want to delete this theme?")) {
			var collection = com.jeromedane.webthemer.Themer.getThemeCollection();
			collection.remove(this.model);
			com.jeromedane.webthemer.Themer.saveData();
			
			Views.installedThemes.render();
		}
	},
	cancel: function(e) {
		if(this.originalCss == this.editor.getValue() || confirm("Are you sure you want to cancel your changes?")) {
			Views.installedThemes.render();
		}
	},
	
	render:function() {
		
		this.$el.html(this.template.render(this.model.toJSON()));

		$('#edit_theme_enabled').attr('checked', this.model.enabled);

		// clear out empty css values		
		var css = $('#edit_theme_css').html();
		if(css == '{css}') {
			$('#edit_theme_css').html('');
		}

		this.editor = ace.edit("edit_theme_css");
		this.editor.setTheme("ace/theme/monokai");
		this.editor.getSession().setMode("ace/mode/css");
		this.editor.commands.addCommand({
		    name: 'save',
		    bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
		    exec: function(editor) {
				com.jeromedane.webthemer.Themer.saveData();
		    }
		});
		
		this.originalCss = this.editor.getValue();
		
	},
	
});