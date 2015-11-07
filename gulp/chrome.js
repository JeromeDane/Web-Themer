var gulp = require('gulp');
var del = require('del');
var template = require('gulp-template');
var fs = require('fs');
var webpack = require('webpack');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var io = require('socket.io');
var watch = require('gulp-watch');

// web socket port for chrome auto-reload extension (https://github.com/JeromeDane/chrome-extension-auto-reload)
var WEB_SOCKET_PORT = 8890;

// configure webpack build path for chrome
var webpackConfig = require('../webpack.config');
webpackConfig.output.path += 'chrome';

function getPackageDetails() {
	return JSON.parse(fs.readFileSync("./package.json", "utf8"));
};

gulp.task('build', ['chrome-scripts', 'chrome-options-html', 'chrome-manifest', 'chrome-images', 'chrome-css', 'chrome-locales'], function (callback) {
	console.log('chrome extension built');
	callback();
});

gulp.task('watch', ['build', 'chrome-watch-reloader'], function(callback) {

	// watch files not build by webpack
	gulp.watch('src/styles/*.scss', ['chrome-css']);
	gulp.watch('src/chrome/options.html', ['chrome-options-html']);
	gulp.watch('src/chrome/_locales/**', ['chrome-locales']);

	// watch webpack built files
	webpack(webpackConfig).watch({}, function(err, stats) {
    	if(err) {
				console.log(err);
			}
	})
});

gulp.task('chrome-scripts', function(callback) {
	webpack(webpackConfig).run(function(err, stats) {
    	if(err) {
				console.log(err);
			} else {
				callback();
			}
	});
});

gulp.task('chrome-watch-reloader', function (callback) {
  io = io.listen(WEB_SOCKET_PORT);
  watch([
    './build/chrome/background.js',
    './build/chrome/content.js',
    './build/chrome/_locales/**'
  ], function (file) {
    console.log('Change detected in', file.relative, ' - Pinging port ' + WEB_SOCKET_PORT + ' for extension reload.');
    io.emit('file.change', {});
  });
  console.log('launched chrome extension reloader')
  callback();
});

gulp.task('chrome-images', function () {
	return gulp.src('src/images/**')
			.pipe(gulp.dest('build/chrome/images'));
});

gulp.task('chrome-locales', function () {
	return gulp.src('src/chrome/_locales/**')
			.pipe(gulp.dest('build/chrome/_locales'));
});

gulp.task('chrome-manifest', function () {
	return gulp.src('src/chrome/manifest.json')
			.pipe(template(getPackageDetails()))
			.pipe(gulp.dest('build/chrome'));
});

gulp.task('chrome-options-html', function () {
	return gulp.src('src/chrome/options.html')
			.pipe(gulp.dest('build/chrome'));
});

gulp.task('chrome-css-scss', ['css-normalize'], function (callback) {
	return gulp.src('src/styles/*.scss')
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest('build/chrome/styles'));
});

gulp.task('chrome-css', ['chrome-css-scss'], function (callback) {
	del('src/styles/normalize.css');
	callback();
});

// TODO: Create dist task that uses this and creates a zipped extension file
gulp.task('chrome-min', function(callback) {
	webpackConfig.plugins = [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			mangle: false,
			comments: false
		})
	];
	webpack(webpackConfig).run(function(err, stats) {
			if(err) {
				console.log(err);
			} else {
				callback();
			}
	});
	delete webpackConfig.plugins;
});
