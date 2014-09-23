var Themer = com.jeromedane.webthemer.Themer;
var Views = {
	
};

jQuery(function($) {
	
	Views.editor = new com.jeromedane.webthemer.views.EditThemeView();
	Views.about = {
		template: new com.jeromedane.Template($('#about-template').html()),
		render:function() {
			$('#content').html(Views.about.template.render());
		}	
	};
	Views.options = {
		template: new com.jeromedane.Template($('#options-template').html()),
		render:function() {
			$('#content').html(Views.options.template.render());
		}	
	};
	
	Themer.init(function() {

		Views.installedThemes = new com.jeromedane.webthemer.views.InstalledThemesView();
		Views.installedThemes.render();
		
		$('#menu_installedThemes').click(function() {
			Views.installedThemes.render();
		});
		$('#menu_about').click(Views.about.render);
		$('#menu_options').click(Views.options.render);
		
	});
	
	
});