var gulp = require('gulp');
var del = require('del');
var template = require('gulp-template');
var fs = require('fs');

function getPackageDetails() {
	return JSON.parse(fs.readFileSync("./package.json", "utf8"));
};

// remove all build and distribution files
gulp.task('clean', function(callback) {
	del('build');
	del('dist');
	callback();
});

var paths = {
	scripts: ['src/js/**/*.coffee', '!client/external/**/*.coffee'],
	images: 'client/img/**/*'
};


gulp.task('images', function () {

});

gulp.task('scripts', function () {

});

gulp.task('manifest', function() {
	return gulp.src('src/manifest.json')
			.pipe(template(getPackageDetails()))
			.pipe(gulp.dest('build'));
});