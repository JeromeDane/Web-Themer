var gulp = require('gulp');
var del = require('del');
var template = require('gulp-template');
var fs = require('fs');
var io = require('socket.io');
var watch = require('gulp-watch');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

// web socket port for chrome auto-reload extension (https://github.com/JeromeDane/chrome-extension-auto-reload)
var WEB_SOCKET_PORT = 8890;

function getPackageDetails() {
	return JSON.parse(fs.readFileSync("./package.json", "utf8"));
};

function webpackExtend(config, callback) {
	
	config['dev-tools'] = 'source-map';
	config.output = {
		path: "./build",
		filename: "[name].js"
	};
	config.module = config.module || {};
	config.module.loaders = config.module.loaders || [];
	config.module.loaders.push({
		test: /\.scss$/,
        loaders: ["style", "css", "sass"]
	});
	config.module.loaders.push(
		{ test: /\.html$/, loader: "underscore-template-loader" }
	);
	/*
	config.module.loaders.push(
		//{test: /\.png$/, loader: "url-loader?mimetype=image/png"},
	);
	*/
	webpack(config, callback);
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

gulp.task('options', ['options-js', 'options-html'], function (callback) {
	callback();
});

gulp.task('options-html', function () {
	return gulp.src('src/options.html')
			.pipe(gulp.dest('build'));
});

gulp.task('scripts', function (callback) {
	webpack({
		entry: {
			options: "./src/options.js",
			background: "./src/background.js",
			content: "./src/content.js"
		},
		output: {
			path: "./build",
			filename: "[name].js"
		},
		devtool: 'source-map',
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

gulp.task('options-js', function (callback) {
	webpackExtend({
		entry: {
			options: "./src/options.js"
		}
	}, callback);
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

gulp.task('watch-options', function () {
	gulp.watch('src/options.html', ['options-html']);
	gulp.watch('src/options.js', ['options-js']);
});
