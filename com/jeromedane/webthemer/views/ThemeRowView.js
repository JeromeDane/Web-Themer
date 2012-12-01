com.jeromedane.webthemer.views = com.jeromedane.webthemer.views || {};

com.jeromedane.webthemer.views.ThemeView = Backbone.View.extend({
	
		tagName:  'div',
		className: 'theme',
		
		initialize : function() {
			this.model.bind('change', this.render, this);
		},
		
		events : {
			'change .enabled input[type="checkbox"]' : 'toggleEnabled',
			'click .edit' : 'edit_clicked',
			'click .delete' : 'delete_clicked'
			
		},
		
		toggleEnabled:function(e) {
			var checked = e.target.checked;
			this.model.attributes.enabled = checked;
			Themer.saveData();
			this.render();
		},
		
		edit_clicked: function(e) {
			
			Views.editor.model = this.model;
			Views.editor.render();
			
		},
		
		delete_clicked: function(e) {
			if(confirm("Are you sure you want to delete this theme?")) {
				Themer.getThemeCollection().remove(this.model);
				Themer.saveData();
				
				Views.installedThemes.render();
			}
			
		},
		
		render: function() {
			
			if(!(this.template)) {
				this.template = new com.jeromedane.Template($('#theme-row-template').html());
			}
			
			this.$el.html( 
			 	this.template.render(this.model.toJSON()) 
			);
			
			if(this.model.attributes.enabled) {
				$('.enabled input[type="checkbox"]', this.$el).attr('checked', true);
			}
			
			if(!this.model.attributes.enabled) {
				this.$el[0].className += ' disabled';
			} else {
				this.$el[0].className = this.$el[0].className.replace(/\sdisabled/, '');
			}
			
			return this;
		}
	
	});