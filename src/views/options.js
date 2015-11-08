var $ = require('jquery'),
  Backbone = require('backbone'),
  AboutView = require('./options/about'),
  InstalledThemesView = require('./options/themes'),
  EditStyleView = require('./options/edit-theme'),
  SettingsView = require('./options/settings'),
  ThemeModel = require('../models/theme');

// TODO: Get webpack scss loader working rather than building as separate gulp process
//require('../styles/options.scss');

var viewProperties = {

  template: require('../templates/options.html'),

  initialize: function() {
    this.views = {
      about: new AboutView(),
      settings: new SettingsView(),
      themes: new InstalledThemesView(),
      'edit-theme': new EditStyleView()
    };

    this.themes = require('../collections/themes').getInstance();

    // listen to sub views for events
    this.views.themes.on('create', this.createTheme, this);
    this.views.themes.on('edit', this.editTheme, this);
    this.views['edit-theme'].on('edit', this.saveTheme, this);
    this.views['edit-theme'].on('close', this.render, this);
  },

  createTheme: function() {
    this.views['edit-theme'].setModel(new ThemeModel());
    this.renderContent('edit-theme');
  },

  editTheme: function(theme) {
    console.log('editing', theme);
    this.views['edit-theme'].setModel(theme);
    this.renderContent('edit-theme');
  },

  events: {
    'click .nav a': 'showClickedNavView'
  },

  saveTheme: function(theme) {
    if(!this.themes.contains(theme)) {
      this.themes.add(theme);
    }
    this.themes.save();
  },

  showClickedNavView: function(evt) {
    var target = evt.target.href.match(/#(.+)$/)[1];
    this.renderContent(target);
  },

  render: function() {
    this.$el.html(this.template());

    var urlMatch = document.location.toString().match(/#(.+)$/);
    this.renderContent(urlMatch ? urlMatch[1] : 'themes');
  },

  renderContent: function(target) {
    this.views[target].setElement($('.content .padding', this.$el));
    this.views[target].render();

    var menuItem = $('.nav a[href$="#' + target + '"]', this.$el);
    if(menuItem.size() === 1) {
      $('.nav a', this.$el).removeClass('active');
      menuItem.addClass('active');
    }
  }
};

module.exports = Backbone.View.extend(viewProperties);
