var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    runsel = require('gulp-run-seq'),
    del = require('del');

gulp.task('clear', function(cb){
    del(['dist/*'],function(err){
        console.log("Files deleted");
        cb();
    });
});

gulp.task('script', function( ){
    return gulp
        .src('src/js/main.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(jshint())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('style', function( ){
    return gulp
        .src('src/css/main.css')
        .pipe(minifyCSS())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('template', function( ){
    return gulp
        .src('src/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('dependency', function( ){
    return gulp
        .src('src/libs/*')
        .pipe(gulp.dest('./dist/libs'));
});

/**
 * Running livereload server
 */
gulp.task('server', function() {
  browserSync({
    server: {
     baseDir: './dist' 
    }
  });
});

gulp.task('watch',function(){
    gulp.watch('src/css/main.css',['style']);
    gulp.watch('src/js/main.js',['script']);
    gulp.watch('src/index.html',['template']);
});

gulp.task('build',['template','style','script']);

gulp.task('cleanbuild', [['clear',['template','dependency','style','script']]],function(){
    console.log("Run clean build suscess")
});


gulp.task('default', ['clear','template','style','script']);