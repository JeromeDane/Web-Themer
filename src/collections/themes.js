var Backbone = require('backbone');
var StyleModel = require('../models/theme');
var styles;

var collectionProperties = {

  model: StyleModel,

  initialize: function() {
    var stylesData = JSON.parse(localStorage.getItem('webThemerStyleData'));
    this.add(stylesData);
    console.log(this.toJSON());
  },

  save: function() {
    localStorage.setItem('webThemerStyleData', JSON.stringify(this.toJSON()));
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
