"use strict";

var gulp = require('gulp');
var watch = require('gulp-watch');
var io = require('socket.io');

// web socket port for chrome auto-reload extension (https://github.com/JeromeDane/chrome-extension-auto-reload)
var WEB_SOCKET_PORT = 8890;

gulp.task('watch', ['default', 'watch-reloader', 'watch-options'], function () {

});

gulp.task('watch-reloader', function () {
	io = io.listen(WEB_SOCKET_PORT);
	watch('./build/background.js', function (file) {
		console.log('change detected in', file.relative);
		io.emit('file.change', {});
	});
});

gulp.task('watch-options', function () {
	gulp.watch('src/styles/*.scss', ['css']);
	gulp.watch('src/options.html', ['options-html']);
	gulp.watch(['src/options.js', 'src/views/**'], ['options-js']);
	gulp.watch('src/background.js', ['background']);
});
