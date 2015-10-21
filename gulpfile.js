var gulp = require('gulp');
var del = require('del');
var template = require('gulp-template');
var fs = require('fs');
var io = require('socket.io');
var watch = require('gulp-watch');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('./gulp/webpack');

// web socket port for chrome auto-reload extension (https://github.com/JeromeDane/chrome-extension-auto-reload)
var WEB_SOCKET_PORT = 8890;

function getPackageDetails() {
	return JSON.parse(fs.readFileSync("./package.json", "utf8"));
};

// remove all build and distribution files
gulp.task('clean', function (callback) {
	del('build');
	del('dist');
	callback();
});

var paths = {
	scripts: ['src/js/**/*.coffee', '!client/external/**/*.coffee'],
	images: 'client/img/**/*'
};

gulp.task('default', ['scripts', 'images'], function () {

});

gulp.task('scripts', ['background', 'manifest', 'options', 'content'], function (callback) {
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

gulp.task('options', ['options-js', 'options-html'], function (callback) {
	callback();
});
gulp.task('options-js', function (callback) {
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

gulp.task('background', function (callback) {
	webpack({
		entry: {
			background: "./src/background.js"
		}
	}, callback);
});

gulp.task('min', function (callback) {
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

gulp.task('content', function (callback) {
	webpack({
		entry: {
			content: "./src/content.js"
		}
	}, callback);
});

gulp.task('watch', ['default', 'watch-reloader', 'watch-options'], function () {

});

gulp.task('watch-reloader', function () {
	io = io.listen(WEB_SOCKET_PORT);
	watch('./build/background.js', function (file) {
		console.log('change detected', file.relative);
		io.emit('file.change', {});
	});
});

gulp.task('watch-options', function () {
	gulp.watch('src/options.html', ['options-html']);
	gulp.watch('src/options.js', ['options-js']);
});
