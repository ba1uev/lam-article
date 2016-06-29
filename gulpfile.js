var gulp = require('gulp'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  browserify = require('gulp-browserify'),
  sass = require('gulp-sass'),
  babel = require('gulp-babel'),
  rigger = require('gulp-rigger'),
  rimraf = require('gulp-rimraf'),
  browserSync = require("browser-sync"),
  reload = browserSync.reload,
  connect = require('gulp-connect');

var path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/'
  },
  src: {
    html: 'src/*.html',
    js: 'src/js/main.js',
    style: 'src/style/main.scss',
  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.scss',
  },
  clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 1337,
    logPrefix: "<3 FRONTEND </3"
};

gulp.task('html:build', function () {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    // .pipe(reload({stream: true}));
    .pipe(connect.reload());
});

gulp.task('js:build', function () {
  gulp.src(path.src.js)
    .pipe(rigger())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(path.build.js))
    // .pipe(reload({stream: true}));
    .pipe(connect.reload());
});

gulp.task('style:build', function () {
  gulp.src(path.src.style)
    .pipe(sass())
    .pipe(prefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(path.build.css))
    // .pipe(reload({stream: true}));
    .pipe(connect.reload());
});

gulp.task('build', [
  'html:build',
  'js:build',
  'style:build'
]);

gulp.task('watch', function(){
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.style], function(event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
});

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    port: 1337,
    root: ['build'],
    middleware: function(connect, opt) {
      return [
        true
      ]
    }
  });
});

// gulp.task('webserver', function () {
//   browserSync(config);
// });

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
