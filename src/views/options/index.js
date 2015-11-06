var $ = require('jquery'),
	Backbone = require('backbone'),
	AboutView = require('./about'),
	InstalledStylesView = require('./installed-styles'),
	SettingsView = require('./settings');

var viewProperties = {

	template: require('../../templates/options/index.html'),

	initialize: function() {
		this.views = {
			about: new AboutView(),
			settings: new SettingsView(),
			'installed-styles': new InstalledStylesView()
		};
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
