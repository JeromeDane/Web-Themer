require.config({
	baseUrl: '',
	paths : {
		app: 'com/jeromedane/webthemer',
		jquery: 'com/jquery/jquery-1.8.2.min',
		jqueryui: 'com/jqueryui/js/jquery-ui-1.9.2.custom.min',
		stringutils: 'nl/stroep/stroep.core.StringUtil',
		underscore: 'com/underscore/underscore-1.4.2.min',
		backbone: 'com/backbone/backbone-0.9.2',
		template: 'com/jeromedane/Template',
		themer: 'com/jeromedane/webthemer/Themer',
		ace: 'org/ajax/ace/src-min-noconflict/ace'
	}
});

var dependencies = [
	'jquery',
	'jqueryui',
	'underscore',
	'backbone'
];
require(dependencies, function() {

	// options.html
	if (document.location.toString().match(/options\.html/)) {
		require(['com/jeromedane/webthemer/options'], function(options) {
			options.init();
		});
	}

	// options.html
	if (document.location.toString().match(/popup\.html/)) {

	}
});

