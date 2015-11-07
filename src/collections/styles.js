var Backbone = require('backbone');
var styles;

var collectionProperties = {
  initialize: function() {

  }
};

var StylesCollection = Backbone.Collection.extend(collectionProperties);

StylesCollection.getInstance = function() {
  if(!styles) {
    styles = new StylesCollection();
  }
  return styles;
};

module.exports = StylesCollection;
