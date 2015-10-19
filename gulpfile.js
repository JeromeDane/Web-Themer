var gulp = require('gulp');
var del = require('del');

var paths = {
	scripts: ['src/js/**/*.coffee', '!client/external/**/*.coffee'],
	images: 'client/img/**/*'
};


gulp.task('scripts', function () {

});

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['build']);
});