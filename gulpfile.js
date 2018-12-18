let gulp = require('gulp');
let browserSync = require('browser-sync');
let autoprefixer = require('gulp-autoprefixer');
let sass = require('gulp-sass');

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'E:\\js\\Andersen2'
        }
    })
});

gulp.task('sass1' , function() {
    return gulp.src('sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

gulp.task('sass', function(){
    return gulp.src('sass/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);
