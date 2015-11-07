var Backbone = require('backbone');
var readmeHtml = require('../../../readme.md');

var viewProperties = {

	render: function() {
		//this.$el.html(this.template());
		this.$el.html(readmeHtml);
	}
};

module.exports = Backbone.View.extend(viewProperties);
