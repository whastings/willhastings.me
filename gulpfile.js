const gulp = require('gulp');
const markdown = require('gulp-markdown');

gulp.task('content', function() {
  return gulp.src('content/**/*.md')
    .pipe(markdown())
    .pipe(gulp.dest('dist/client/content'));
});

gulp.task('default', ['content']);
