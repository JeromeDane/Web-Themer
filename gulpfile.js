var gulp = require('gulp');
var del = require('del');

require('./cfg/gulp/chrome');
require('./cfg/gulp/tests');

function getPackageDetails() {
	return JSON.parse(fs.readFileSync("./package.json", "utf8"));
};

// remove all build and distribution files
gulp.task('clean', function(callback) {
	del('build');
	del('dist');
	callback();
});

gulp.task('default', ['chrome', 'test-build'], function () {

});

gulp.task('css-normalize', function (callback) {
	return gulp.src('node_modules/normalize.css/normalize.css')
		.pipe(gulp.dest('src/styles'));
});
