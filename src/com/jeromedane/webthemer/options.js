var dependencies = [
	'themer',
	'template',
	'app/views/InstalledThemesView',
	'app/collections/ThemeCollection'
];

var Views = {};

define(dependencies, function(Themer, Template, InstalledThemesView, ThemeCollection) {

	return new (function() {
		
		this.init = function() {
			
			Views.about = {
				template: new Template($('#about-template').html()),
				render:function() {
					$('#content').html(Views.about.template.render());
				}	
			};
			
			Views.options = {
				template: new Template($('#options-template').html()),
				render:function() {
					$('#content').html(Views.options.template.render());
				}	
			};
			
			Themer.init(function() {
		
				Views.installedThemes = new InstalledThemesView();
				
				Views.installedThemes.render();
				
				$('#menu_about').click(Views.about.render);
				$('#menu_installedThemes').click(function() {
					Views.installedThemes.render();
				});
				
				
				$('#menu_options').click(Views.options.render);
				
			});
		};
			
	})();

		
	
});

