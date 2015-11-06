"use strict";

var gulp = require('gulp');
var watch = require('gulp-watch');
var io = require('socket.io');

// web socket port for chrome auto-reload extension (https://github.com/JeromeDane/chrome-extension-auto-reload)
var WEB_SOCKET_PORT = 8890;

gulp.task('chrome-watch', ['chrome', 'chrome-watch-reloader', 'chrome-watch-code'], function (callback) {
  console.log('watching for changes in chrome extension');
  callback();
});

gulp.task('chrome-watch-reloader', function (callback) {
  io = io.listen(WEB_SOCKET_PORT);
  watch([
    './build/chrome/background.js',
    './build/chrome/content.js',
    './build/chrome/_locales/**'
  ], function (file) {
    console.log('change detected in', file.relative);
    io.emit('file.change', {});
  });
  console.log('launched chrome extension reloader')
  callback();
});

gulp.task('chrome-watch-code', function (callback) {
  gulp.watch('src/styles/*.scss', ['chrome-css']);
  gulp.watch('src/chrome/options.html', ['chrome-options-html']);
  gulp.watch('src/chrome/background.js', ['chrome-background']);
  gulp.watch('src/chrome/content.js', ['chrome-content']);
  gulp.watch('src/chrome/_locales/**', ['chrome-locales']);
  gulp.watch(
    [
      'src/chrome/options.js',
      'src/views/**',
      'src/templates/**',
      'readme.md'
    ],
    ['chrome-options-js']
  );
  callback();
});
