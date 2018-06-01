import gulp from 'gulp'
import babel from 'gulp-babel'
import jsmin from 'gulp-jsmin'

export const transpile = () => {
  const target = {
    src: ['src/*'],
    dest: 'dist/'
  }
  gulp.src(target.src)
    .pipe(babel({ignore: 'gulpfile.babel.js'}))
    .pipe(jsmin())
    .pipe(gulp.dest(target.dest))
}
