var gulp = require('gulp');
var webpack = require('./webpack');
var shell = require('gulp-shell')
var watch = require('gulp-watch');
var open = require('gulp-open');

gulp.task('test-prebuild', shell.task([
		"mocha init build/tests"
]));

gulp.task('test-build', ['test-prebuild'], function(callback) {
  webpack('tests', {
    entry: {
      tests: './src/tests/index.js'
    }
  }, callback);
});

gulp.task('test-watch', ['test'], function(callback) {
	gulp.watch('src/tests/*.js', ['test-build']);
});

gulp.task('test', ['test-build'], function() {
	gulp.src('./build/tests/index.html')
  .pipe(open());
})