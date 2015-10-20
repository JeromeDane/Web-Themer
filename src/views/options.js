var Backbone = require('Backbone');

require('../styles/options.scss');

var viewProperties = {
	
	template: require('../templates/options.html'),
	
	render: function() {
		
		this.$el.html(this.template());
	}
};

module.exports = Backbone.View.extend(viewProperties);