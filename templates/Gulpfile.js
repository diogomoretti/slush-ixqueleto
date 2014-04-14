// Load Gulp and your plugins
var gulp    = require('gulp'),
    connect = require('gulp-connect'),
    stylus  = require('gulp-stylus'),
    plumber = require('gulp-plumber');

var paths = {
    styles: '_src/stylus/**/*',
    html:   '*.html'
};

// Connect task
gulp.task('connect', connect.server({
    root: __dirname + '/',
    port: 5000,
    livereload: true,
    open: {
        browser: 'Google Chrome'
    }
}));

// HTML task
gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(connect.reload());
});

// Stylus task
gulp.task('stylus', function () {
    gulp.src('./_src/stylus/*.styl')
        .pipe(plumber())
        .pipe(stylus({
            use: ['nib'], 
            //set: ['compress']
        }))
        .pipe(gulp.dest('./assets/css'))
        .pipe(connect.reload());
});

// Default gulp task to run
gulp.task('default', ['stylus']);

// Gulp watch
gulp.task('server', ['stylus'], function () {
    gulp.watch(paths.styles, ['stylus']);
    gulp.watch(paths.html, ['html']);
});