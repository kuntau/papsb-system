
var gulp       = require('gulp'),
    livereload = require('gulp-livereload'),
    nodemon    = require('gulp-nodemon');

gulp.task('default', function() {
  console.log('from gulp!');
  nodemon({ script: 'server.js',
            // ext: 'js',
            ignore: ['./public/**']});
  // gulp.run('watch');
  livereload.listen();
  gulp.watch('public/**').on('change', livereload.changed);
    // .on('change', livereload.changed);
    // .on('restart', livereload.changed);
    //   livereload.changed;
    // });
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('public/**').on('change', livereload.changed);
});
