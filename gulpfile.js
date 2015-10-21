var gulp = require('gulp');
var del = require('del');
var template = require('gulp-template');
var fs = require('fs');
var webpack = require('./gulp/webpack');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


require('./gulp/watch');

function getPackageDetails() {
	return JSON.parse(fs.readFileSync("./package.json", "utf8"));
};

// remove all build and distribution files
gulp.task('clean', function(callback) {
	del('build');
	del('dist');
	callback();
});

gulp.task('default', ['scripts', 'images', 'css'], function () {

});

gulp.task('scripts', ['background', 'manifest', 'options', 'content'], function(callback) {
	callback();
});

gulp.task('images', function () {
	return gulp.src('src/img/**')
			.pipe(gulp.dest('build/img'));
});

gulp.task('manifest', function () {
	return gulp.src('src/manifest.json')
			.pipe(template(getPackageDetails()))
			.pipe(gulp.dest('build'));
});

gulp.task('options', ['options-js', 'options-html'], function(callback) {
	callback();
});
gulp.task('options-js', function(callback) {
	webpack({
		entry: {
			options: "./src/options.js"
		}
	}, callback);
});
gulp.task('options-html', function () {
	return gulp.src('src/options.html')
			.pipe(gulp.dest('build'));
});
gulp.task('css', function () {
	return gulp.src('src/styles/*.scss')
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest('build/styles'));
});

gulp.task('background', function(callback) {
	webpack({
		entry: {
			background: "./src/background.js"
		}
	}, callback);
});

gulp.task('min', function(callback) {
	webpack({
		entry: {
			options: "./src/options.js",
			background: "./src/background.js",
			content: "./src/content.js"
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

gulp.task('content', function(callback) {
	webpack({
		entry: {
			content: "./src/content.js"
		}
	}, callback);
});