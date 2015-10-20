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


gulp.task('default', ['manifest'], function () {

});

gulp.task('copy', function () {
	return gulp.src('src/**')
			.pipe(gulp.dest('build'));
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
				devtool: 'inline-source-map',
				resolve: {
					alias: {
				//		'app/options': './src/com/jeromedane/webthemer/options'
					}
				}
			}))
			.pipe(rename("background.js"))
			.pipe(gulp.dest('./build'));
});

gulp.task('watch', ['default', 'watch-extension'], function () {
	// Create a full build for Chrome and automatically update it when files change
	gulp.watch('src/**/*.*', ['default']);
});

gulp.task('watch-extension', function () {
	io = io.listen(WEB_SOCKET_PORT);
	watch('./build/**', function (file) {
		console.log('change detected', file.relative);
		io.emit('file.change', {});
	});
});
