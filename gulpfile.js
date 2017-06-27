/**
 * Created by cryst on 2017/6/23.
 */
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect');

var data = require('./build/data');


gulp.task('data', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch('web/**/**/*.html', function () {
        data.run();
    });
});

gulp.task('server', function() {
    connect.server({
        livereload: false,
        port: 8080
    });
});

gulp.task('serve', ['data', 'server']);