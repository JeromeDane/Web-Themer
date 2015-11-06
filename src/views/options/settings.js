var Backbone = require('backbone');

var viewProperties = {

	template: require('../../templates/options/settings.html'),

	render: function() {
		this.$el.html(this.template());
	}
};

module.exports = Backbone.View.extend(viewProperties);
