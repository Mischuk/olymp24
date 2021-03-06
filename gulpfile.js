var gulp         = require('gulp');
var connect      = require('gulp-connect');
var stylus       = require('gulp-stylus');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var rigger       = require('gulp-rigger');
var notify       = require('gulp-notify');
var cleanCSS     = require('gulp-clean-css');


// Local server
gulp.task('connect', function () {
  connect.server({
    root: ['./app'],
    livereload: true
  });
});

// HTML
gulp.task('html', function () {
  return gulp.src('./dev/index.html')
    .pipe(rigger())
    .pipe(gulp.dest('./app/'))
    .pipe(connect.reload());
});

// JS
gulp.task('js', function () {
  return gulp.src('./dev/scripts/*.js')
    .pipe(gulp.dest('./app/scripts/'))
    .pipe(connect.reload());
});

// Images
gulp.task('images', function () {
  return gulp.src('./dev/images/**/*.*')
    .pipe(gulp.dest('./app/images/'))
    .pipe(connect.reload());
});

// STYL
gulp.task('styl', function() {
  var onError = function(err) {
    notify.onError({
      title:    "Styles",
      subtitle: "Failure!",
      message:  "Error: <%= error.message %>"
    })(err);
    this.emit('end');
  };

  return gulp.src("./dev/styles/app.styl")
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(autoprefixer({
      browsers: ['last 2 version', 'safari 5', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./app/styles"))
    .pipe(connect.reload());
});

// CSS
gulp.task('vendor', function () {
  return gulp.src('./dev/styles/vendor.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./app/styles/'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch("./dev/index.html", ['html']);
  gulp.watch("./dev/html-modules/*.html", ['html']);
  gulp.watch("./dev/scripts/*.js", ['js']);
  gulp.watch("./dev/images/**/*.*", ['images']);
  gulp.watch("./dev/styles/**/*.styl", ['styl']);
  gulp.watch("./dev/styles/vendor.css", ['vendor']);
});

// Watching project files
gulp.task('default', ['html', 'js', 'images', 'styl', 'vendor', 'connect', 'watch']);