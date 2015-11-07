var $ = require('jquery'),
	Backbone = require('backbone'),
	AboutView = require('./options/about'),
	InstalledStylesView = require('./options/installed-styles'),
	SettingsView = require('./options/settings');

// TODO: Get webpack scss loader working rather than building as separate gulp process
//require('../styles/options.scss');

var viewProperties = {

	template: require('../templates/options.html'),

	initialize: function() {
		this.views = {
			about: new AboutView(),
			settings: new SettingsView(),
			'installed-styles': new InstalledStylesView()
		};

		this.styles = require('../collections/styles').getInstance();
		console.log(this.styles);
	},

	events: {
		'click .nav a': 'showClickedNavView'
	},

	showClickedNavView: function(evt) {
		var target = evt.target.href.match(/#(.+)$/)[1];
		this.renderContent(target);
	},

	render: function() {
		this.$el.html(this.template());

		var urlMatch = document.location.toString().match(/#(.+)$/);
		this.renderContent(urlMatch ? urlMatch[1] : 'installed-styles');
	},

	renderContent: function(target) {
		this.views[target].setElement($('.content .padding', this.$el));
		this.views[target].render();
		$('.nav a', this.$el).removeClass('active');
		$('.nav a[href$="#' + target + '"]', this.$el).addClass('active');
	}
};

module.exports = Backbone.View.extend(viewProperties);
