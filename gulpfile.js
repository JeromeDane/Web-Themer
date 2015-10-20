var gulp = require('gulp');
var del = require('del');
var template = require('gulp-template');
var fs = require('fs');
var io = require('socket.io');
var watch = require('gulp-watch');
var webpack = require('webpack-stream');
var rename = require("gulp-rename");

// web socket port for chrome auto-reload extension (https://github.com/JeromeDane/chrome-extension-auto-reload)
var WEB_SOCKET_PORT = 8890;

function getPackageDetails() {
	return JSON.parse(fs.readFileSync("./package.json", "utf8"));
}
;

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

gulp.task('images', function() {
	return gulp.src('src/img/**')
			.pipe(gulp.dest('build/img'));
});

gulp.task('manifest', function () {
	return gulp.src('src/manifest.json')
			.pipe(template(getPackageDetails()))
			.pipe(gulp.dest('build'));
});

gulp.task('background', function () {
	return gulp.src("./src/background.js")
			.pipe(webpack({
				module: {
					loaders: [
						//{test: /\.png$/, loader: "url-loader?mimetype=image/png"},
						//{test: /\.css$/, loader: 'style!css' }
					]
				},
				devtool: 'inline-source-map'
			}))
			.pipe(rename("background.js"))
			.pipe(gulp.dest('./build'));
});

gulp.task('options', ['options-js', 'options-html'], function(callback) {
	callback();
});

gulp.task('options-html', function() {
	return gulp.src('src/options.html')
			.pipe(gulp.dest('build'));
});

gulp.task('options-js', function () {
	return gulp.src("./src/options.js")
			.pipe(webpack({
				module: {
					loaders: [
						//{test: /\.png$/, loader: "url-loader?mimetype=image/png"},
						//{test: /\.css$/, loader: 'style!css' }
					]
				},
				devtool: 'inline-source-map'
			}))
			.pipe(rename("options.js"))
			.pipe(gulp.dest('./build'));
});
gulp.task('content', function () {
	return gulp.src("./src/content.js")
			.pipe(webpack({
				module: {
					loaders: [
						//{test: /\.png$/, loader: "url-loader?mimetype=image/png"},
						//{test: /\.css$/, loader: 'style!css' }
					]
				},
				devtool: 'inline-source-map',
				resolve: {
					alias: {
				//		'app/options': './src/com/jeromedane/webthemer/options'
					}
				}
			}))
			.pipe(rename("content.js"))
			.pipe(gulp.dest('./build'));
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

gulp.task('watch-options', function() {
	gulp.watch('src/options.html', ['options-html']);
	gulp.watch('src/options.js', ['options-js']);
});
