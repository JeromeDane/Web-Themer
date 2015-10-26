var gulp = require('gulp');
var del = require('del');

require('./gulp/chrome');
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

gulp.task('default', ['chrome'], function () {

});
