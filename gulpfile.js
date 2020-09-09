// var gulp = require('gulp');
// var shell = require('gulp-shell');
// var browserSync = require('browser-sync').create();
// const { series } = require('gulp');

// gulp.task('default', function(){
// 	console.log('Default task');
// });
// // Task for building blog when something changed:
// gulp.task('build', shell.task(['bundle exec jekyll serve']));
// // If you don't use bundle:
// // gulp.task('build', shell.task(['jekyll serve']));
// // If you use  Windows Subsystem for Linux (thanks @SamuliAlajarvela):
// // gulp.task('build', shell.task(['bundle exec jekyll serve --force_polling']));

// // Task for serving blog with Browsersync
// gulp.task('serve', function () {
//     browserSync.init({server: {baseDir: '_site/'}});
//     // Reloads page when some of the already built files changed:
//     gulp.watch('_site/**/*.*').on('change', browserSync.reload);
// });

// // gulp.task('default', ['build', 'serve']);
// exports.default = series('build', 'serve');


const gulp =require('gulp');
const sass =require('gulp-sass');
const browserSync = require('browser-sync');
const exec = require('gulp-exec');
const { series } = require('gulp');
const {src, dest} = require('gulp');


function style () {
    return gulp.src('/_app/alt.scss')
    .pipe(sass())
    .pipe(gulp.dest('/style.css',))
    .pipe(browserSync.stream());
}

function compile () {
    return gulp.src('/style.css',)
    .pipe(sass())
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.stream());
}

// function build() {
//     return exec('bundle exec jekyll serve')
//     .pipe(browserSync.stream());
// }

function watch () {
    browserSync.init({
        server: {
            baseDir: '_site/'
        }
    });
    gulp.watch('_site/**/**/*.scss').on('change', browserSync.reload);
    gulp.watch('_site/*.html').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
exports.compile = compile;
// exports.build = build;

exports.default = series( watch, style, compile);
// // gulp.task('default', gulp.series('build', 'serve'));