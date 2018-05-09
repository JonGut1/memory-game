var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
browserSync.init({
     server: "dist/"
});


gulp.task('styles', function(done) {
	gulp.src('source/css/*.scss')
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 2 versions']
	}))
	.pipe(gulp.dest('dist/css'))
	browserSync.reload();
	done()
});

gulp.task('default', function(done) {
	gulp.watch('source/css/*.scss', gulp.series('styles'))
	gulp.watch('source/index.html', gulp.series('copy-html'))
	gulp.watch('source/js/*.js', gulp.series('scripts'))
	done()
});

gulp.task('scripts', function(done) {
	gulp.src('source/js/*.js')
	.pipe(babel( {
		plugins: ['transform-runtime'],
        presets: ['env']
    }))
	.pipe(gulp.dest('dist/js'))
	browserSync.reload();
	done()
});

gulp.task('copy-html', function(done) {
	gulp.src('source/index.html')
	.pipe(gulp.dest('dist'))
	browserSync.reload();
	done()
});

