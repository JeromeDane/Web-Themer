var Backbone = require('backbone');
var readmeHtml = require('../../../readme.md');

var viewProperties = {

	template: require('../../templates/options/about.html'),

	render: function() {
		//this.$el.html(this.template());
		this.$el.html(readmeHtml);
	}
};

module.exports = Backbone.View.extend(viewProperties);
