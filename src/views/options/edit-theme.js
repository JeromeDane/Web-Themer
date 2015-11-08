var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var viewProperties = {

  template: require('../../templates/options/edit-theme.html'),

  events: {
    'click button.cancel': 'close',
    'click button.confirm': 'saveAndClose',
    'change input.name': 'updateName',
    'keyup input.name': 'updateName'
  },

  close: function() {
    if(this.model.hasChanged()) {
      if(!confirm('Are you sure you want to cancel without saving changes?')) {
        return;
      }
    }
    this.trigger('close');
  },

  getName: function() {
    return $('input.name', this.$el).val().replace(/^\s+/, '').replace(/\s+$/, '');
  },

  setModel: function(theme) {

    // remove change listener from existing model
    if(this.model) {
      this.model.off('change', this.updateButtonState);
    }

    // set new model and listen for changes
    this.model = theme;
    this.model.on('change', this.updateButtonState, this);
  },

  validate: function() {
    if(!this.getName()) {
      alert('Please enter a name for the theme');
      return false;
    }
    return true;
  },

  saveAndClose: function() {
    if(this.validate()) {
      this.trigger('save', this.model);
      this.close();
    }
  },

  updateButtonState: function() {
    if(this.model.hasChanged()) {
      $('button.confirm', this.$el).prop('disabled', false);
    } else {
      $('button.confirm', this.$el).prop('disabled', true);
    }
  },

  updateName: function() {
    if(this.model.get('name') !== this.getName()) {
      this.model.set('name', this.getName());
    }
  },

  render: function() {

    console.log('rendering', this.model);

    this.$el.html(this.template({
      _: _,
      theme: this.model.toJSON()
    }));
    $('input.name', this.$el).focus();
    this.updateButtonState();
  }
};

module.exports = Backbone.View.extend(viewProperties);
