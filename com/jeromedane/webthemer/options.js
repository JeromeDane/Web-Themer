var Themer = com.jeromedane.webthemer.Themer;
var Views = {};

jQuery(function($) {
	
	Views.editor = new com.jeromedane.webthemer.views.EditThemeView();
	
	Themer.init(function() {

		Views.installedThemes = new com.jeromedane.webthemer.views.InstalledThemesView();
		Views.installedThemes.setTemplate('installed-themes-template');
		Views.installedThemes.render();
		
	});
	
});