
var gulp       = require('gulp'),
    livereload = require('gulp-livereload'),
    nodemon    = require('gulp-nodemon'),
    stylus     = require('gulp-stylus'),
    concat     = require('gulp-concat'),
    filter     = require('gulp-filter');

gulp.task('default', function() {
  var watcher = gulp.watch('public/**', ['css', 'reload']);

  nodemon({ script: 'server.js',
            ext: 'js',
            env: { 'NODE_ENV': 'development' },
            ignore: ['./public/**']});
  // gulp.run('watch');
  livereload.listen();
  //gulp.watch('public/**').on('change', livereload.changed);
  watcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running task...');
  });
});

gulp.task('css', function () {
  var stylusFiler = filter('**/*.styl');

  return gulp.src([
    './public/css/styles/*.styl'
  ])
    .pipe(stylusFiler)
    .pipe(stylus())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('reload', function () {
  livereload.changed();
})

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('public/**').on('change', livereload.changed);
});
