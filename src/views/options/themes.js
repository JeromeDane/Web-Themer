var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');
var themes = require('../../collections/themes').getInstance();

var viewProperties = {

  template: require('../../templates/options/themes.html'),

  editTheme: function(evt) {
    var guid = $(evt.target).attr('data-theme-guid');
    var theme = themes.findWhere({ guid: guid });
    this.trigger('edit', theme);
  },

	events: {
		'click button.new-style': 'createStyle',
    'click a.edit': 'editTheme'
	},

  initialize: function() {
    themes.on('update', this.render);
  },

  render: function() {

    // don't try to render if not visible
    if(!this.$el) {
      return;
    }

    this.$el.html(this.template({
      _: _,
      themes: themes.toJSON()
    }));
  },

	createStyle: function() {
		this.trigger('create');
	}
};

module.exports = Backbone.View.extend(viewProperties);
