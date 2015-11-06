var Backbone = require('backbone'),
	AboutView = require('./about'),
	InstalledStylesView = require('./installed-styles'),
	SettingsView = require('./settings');

var viewProperties = {

	template: require('../../templates/options/index.html'),

	initialize: function() {
		this.views = {
			about: new AboutView();
		};
	},

	events: {
		'click .nav a': 'showClickedNavView'
	},

	showClickedNavView: function(evt) {
		var target = evt.target.href.match(/#(.+)$/)[1];
		this.views[target].setElem($('.content', this.$el));
		this.views[target].render();
	},

	render: function() {
		this.$el.html(this.template());
	}
};

module.exports = Backbone.View.extend(viewProperties);
