const gulp =require('gulp');
const sass =require('gulp-sass');
const browserSync = require('browser-sync');


function style () {
    return gulp.src('_app/alt.scss')
    .pipe(sass())
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.stream());
}

function watch () {
    browserSync.init({
        server: {
            baseDir: '_site/'
        }
    });
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;

// var gulp = require('gulp');
// var shell = require('gulp-shell');
// var browserSync = require('browser-sync').create();

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
//     browserSync.init({
//         server: {
//             baseDir: '_site/'
//         }
//     });
//     // Reloads page when some of the already built files changed:
//     gulp.watch('_site/**/*.*').on('change', browserSync.reload);
// });

// gulp.task('default', gulp.series('build', 'serve'));