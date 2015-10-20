var dependencies = [
	'themer',
	'app/views/ThemeListView'
];

define(dependencies, function(Themer, ThemeListView) {
	
	console.log(Themer);
	
	return new (function() {
		
		this.init = function() {
			Themer.init(function() {
				var view = new ThemeListView();
				view.setElement($('#themeList'));
				console.log($('#themeList').size());
				view.render();
			});
		};
	})();
		
});