var dependencies = [
	'themer',
	'template',
	'ace'
];

define(dependencies, function(Themer, Template) {
	
	var EditThemeView = Backbone.View.extend({
			
		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#content',
		
		initialize:function() {
			
			this.template = new Template($('#theme-editor-template').html());
			
		},
		
		events : {
			'click #saveButton' : 'save_theme',
			'click #saveAndCloseButton' : 'save_and_close_theme',
			'click #deleteThemeButton' : 'delete_theme',
			'click #cancelEditThemeButton' : 'cancel'
		},
		save_theme: function(e) {
			this.model.set('name', $('#edit_theme_name').val());
			this.model.set('urlPattern', $('#edit_theme_urlPattern').val());
			this.model.set('css', this.editor.getValue());
			this.model.set('enabled', $('#edit_theme_enabled').attr('checked'));
			Themer.saveData();
		},
		save_and_close_theme:function() {
			this.save_theme();
			Views.installedThemes.render();
		},
		delete_theme: function(e) {
			if(confirm("Are you sure you want to delete this theme?")) {
				var collection = Themer.getThemeCollection();
				collection.remove(this.model);
				Themer.saveData();
				
				Views.installedThemes.render();
			}
		},
		cancel: function(e) {
			if(this.originalCss == this.editor.getValue() || confirm("Are you sure you want to cancel your changes?")) {
				Views.installedThemes.render();
			}
		},
		
		render:function() {
			
			console.log('rendering edit theme view');
			
			this.$el.html(this.template.render(this.model.toJSON()));
	
			$('#edit_theme_enabled').attr('checked', this.model.attributes.enabled);
	
			// clear out empty css values		
			var css = $('#edit_theme_css').html();
			if(css == '{css}') {
				$('#edit_theme_css').html('');
			}
	
			var _view = this;
	
			this.editor = ace.edit("edit_theme_css");
			this.editor.setTheme("ace/theme/monokai");
			this.editor.getSession().setMode("ace/mode/css");
			this.editor.commands.addCommand({
			    name: 'save',
			    bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
			    exec: function(editor) {
					_view.save_theme();
			    }
			});
			
			var height = $(window).height() - 250;
			$('#edit_theme_css').height(height);
			$('#edit_theme_css').parent().height(height + 10);
			
			this.originalCss = this.editor.getValue();
			
		},
		
	});
	
	return EditThemeView;
		
});