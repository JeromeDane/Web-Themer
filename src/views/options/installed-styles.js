var Backbone = require('backbone');

var viewProperties = {

	template: require('../../templates/options/installed-styles.html'),

	render: function() {
		this.$el.html(this.template());
	}
};

module.exports = Backbone.View.extend(viewProperties);
