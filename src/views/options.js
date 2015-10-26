var Backbone = require('Backbone');

var viewProperties = {

	template: require('../templates/options.html'),

	render: function() {
		alert('body');
		this.$el.html(this.template());
	}
};

module.exports = Backbone.View.extend(viewProperties);
