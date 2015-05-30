
var gulp       = require('gulp'),
    livereload = require('gulp-livereload'),
    nodemon    = require('gulp-nodemon'),
    annotate   = require('gulp-ng-annotate'),
    concat     = require('gulp-concat'),
    filter     = require('gulp-filter'),
    stylus     = require('gulp-stylus'),
    nib        = require('nib');

gulp.task('default', function () {
  console.log("from default task");
});

gulp.task('dev', ['css'], function() {
  var watcher = gulp.watch([
        'public/js/**',
        'public/css/**',
        'public/views/**',
        'public/index.html',
        '!public/css/style.css'
        ], ['reload']);

  nodemon({ script: 'server.js',
            ext: 'js',
            env: { 'NODE_ENV': 'development' },
            ignore: ['.git/**','.idea/**','./public/**']
          });

  livereload({ start: true });
  watcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running task...');
  });
});

gulp.task('js', function () {
  var source = ['./public/js/**.js'];

  return gulp
    .src(source)
    .pipe(annotate({add: true, single_quotes: true}))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('css', function () {
  var stylusFiler = filter('**/*.styl');

  return gulp.src([
    './public/assets/styles/*.styl'
  ])
    .pipe(stylusFiler)
    .pipe(stylus({
       use: nib(),
       compress: true
     }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('reload', ['css'], function () {
  setTimeout(function () {
//    livereload.changed();
    livereload.reload();
  }, 500)
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('public/**').on('change', livereload.changed);
});
