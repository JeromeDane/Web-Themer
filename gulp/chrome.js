var gulp = require('gulp');
var del = require('del');
var template = require('gulp-template');
var fs = require('fs');
var webpack = require('./webpack');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

require('./watch');

function getPackageDetails() {
	return JSON.parse(fs.readFileSync("./package.json", "utf8"));
};

gulp.task('chrome', ['chrome-scripts', 'chrome-images', 'chrome-css', 'chrome-locales'], function (callback) {
	console.log('chrome extension built');
	callback();
});

gulp.task('chrome-scripts', ['chrome-background', 'chrome-manifest', 'chrome-options', 'chrome-content'], function(callback) {
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

gulp.task('chrome-options', ['chrome-options-js', 'chrome-options-html'], function(callback) {
	callback();
});
gulp.task('chrome-options-js', function(callback) {
	webpack('chrome', {
		entry: {
			options: "./src/chrome/options.js"
		}
	}, callback);
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

gulp.task('chrome-background', function(callback) {
	webpack('chrome', {
		entry: {
			background: "./src/chrome/background.js"
		}
	}, callback);
});

gulp.task('chrome-min', function(callback) {
	webpack('chrome', {
		entry: {
			options: "./src/chrome/options.js",
			background: "./src/chrome/background.js",
			content: "./src/chrome/content.js"
		},
		plugins: [
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true,
				mangle: false,
				comments: false
			})
		]
	}, callback);
});

gulp.task('chrome-content', function(callback) {
	webpack('chrome', {
		entry: {
			content: "./src/chrome/content.js"
		}
	}, callback);
});
