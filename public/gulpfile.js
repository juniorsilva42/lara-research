var dest      = "./media",
    src       = './build',
    notjssrc  = '!' + src + '/js/main.js';

const gulp = require('gulp'),
      browserSync = require('browser-sync');
      sass = require('gulp-sass');
      reload = browserSync.reload;
      concat = require('gulp-concat');
      uglify = require('gulp-uglify');
      imagemin = require('gulp-imagemin');
      pngquant = require('imagemin-pngquant');
      autoprefixer = require('gulp-autoprefixer');
      pagespeed = require('psi');
      del = require('del');
      jshint = require('gulp-jshint');
      stylish = require('jshint-stylish');
      growl = require('growl');
      gutil = require('gulp-util');
      changed = require('gulp-changed'),
      elixir = require('laravel-elixir');


var AUTOPREFIXER_BROWSERS = [
  'ie >= 8',
  'ie_mob >= 8',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 2.1',
  'bb >= 10'
];

// Error handling
function errorAlert(error) {

  var lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ': ' : '';
  if (error.fileName) {
    var filename = (error.fileName).split('/');
    filename = filename[filename.length - 1];
  } else {
    filename = '';
  }

  notify({
    subtitle: error.plugin.toUpperCase() + ' caused an error.',
    title: lineNumber + filename,
    sound: 'Glass' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
  }).write(error);

  // Inspect the error object
  // console.log(error);

  // Easy error reporting
  // console.log(error.toString());

  // Pretty error reporting
  var report = '';
  var chalk = gutil.colors.white.bgRed;

  report += chalk('TASK:') + ' [' + error.plugin + ']\n';
  report += chalk('PROB:') + ' ' + error.message + '\n';
  if (error.lineNumber) {
    report += chalk('LINE:') + ' ' + error.lineNumber + '\n';
  }
  if (error.fileName) {
    report += chalk('FILE:') + ' ' + error.fileName + '\n';
  }
  console.error(report);

  // Prevent the 'watch' task from stopping
  this.emit('end');
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync({
    server: src
  });
  gulp.watch(src + "/sass/**/*.scss", ['sass']);
  gulp.watch([src + "/js/**/*.js", notjssrc], ['js']);
  gulp.watch(src + "/*.html").on('change', reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src(src + "/sass/*.scss")
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['chrome >= 40']
    })) // no autprefixing needed in development
    .pipe(gulp.dest(src))
    .pipe(reload({
      stream: true
    }));
});

// JSlint
gulp.task('jslint', function() {
  return gulp.src([src + '/js/*.js', notjssrc])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Lint JS first, then concat and minify
gulp.task('js', ['jslint'], function() {
  return gulp.src([src + '/js/lib/*.js', src + '/js/*.js', notjssrc])  .pipe(concat('main.js'))    .pipe(gulp.dest(src + '/js/'))
    .pipe(reload({
      stream: true
    }));
});

// compress images
gulp.task('compress', function() {
  return gulp.src(src + '/images/**')
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(dest + '/images/'));
});

// PRODUCTION
gulp.task('sass-prod', function() {
  return gulp.src(src + "/sass/*.scss")
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: AUTOPREFIXER_BROWSERS
    }))
    .pipe(gulp.dest(dest));
});

gulp.task('js-prod', ['jslint'], function() {
  // uglify JS
  return gulp.src(src + '/js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest(dest + '/js/'));
});

gulp.task('copy-files-root', function() {
  // but do not copy the dev's style.css and the sass folder
  return gulp.src([src + '/*', "!" + src + "/style.css", "!" + src + "/sass"])
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});

gulp.task('copy-files', function() {
  // copy touch-icon-images
  return gulp.src(src + '/images/icons-touch/*')
    .pipe(changed(dest + '/images/icons-touch'))
    .pipe(gulp.dest(dest + '/images/icons-touch'));
});

// Preparing files for production: First, run the 'js' task, afterwards ...
gulp.task('production', ['js-prod', 'sass-prod', 'copy-files-root', 'copy-files'], function() {
  process.stdout.write("\nTo minify and copy images, run the 'compress'-task.\n\n");
});

// alias task name
gulp.task('prod', ['js-prod', 'sass-prod', 'copy-files-root', 'copy-files'], function() {
  process.stdout.write("\nTo minify and copy images, run the 'compress'-task.\n\n");
});

// Clean Output Directory
gulp.task('clear', del.bind(null, [dest + '/**/*'], {
  dot: true
}));

// Google pagespeed
gulp.task('pagespeed', function(cb) {
  // Update the below URL to the public URL of your site
  pagespeed.output('example.com', {
    strategy: 'mobile'
      // By default we use the PageSpeed Insights free (no API key) tier.
      // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
      // key: 'YOUR_API_KEY'
  }, cb);
});

// Easy FTP-upload
gulp.task('deploy', ['prod'], function() {
  var conn = ftp.create(ftpconfig);
  return gulp.src('./build/**/*', {
      base: 'build',
      buffer: false
    })
    .pipe(conn.newer('/')) // only upload newer files
    .pipe(conn.dest('/'));
});

// Default: turn the server on and refresh/inject on change!
gulp.task('default', ['serve']);
