var Backbone = require('backbone');
var Guid = require('guid');

var styleProperties = {
  initialize: function() {

    // create a guid for the theme
    if(!this.get('guid')) {
      this.set('guid', Guid.raw());
    }
  }
};

module.exports = Backbone.Model.extend(styleProperties);
