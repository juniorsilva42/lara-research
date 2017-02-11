'use strict';

(function(){

  var gulp = require('gulp');

  var $ = {
    util          : require('gulp-util'),
    fs            : require('fs'),
    del           : require('del'),
    path          : require('path'),
    mergeStream   : require('merge-stream'),
    clipEmptyFiles: require('gulp-clip-empty-files'),
    changed       : require('gulp-changed'),
    imageMin      : require('gulp-imagemin'),
    svgSprite     : require('gulp-svg-sprite'),
    jsHint        : require('gulp-jshint'),
    uglify        : require('gulp-uglify'),
    sass          : require('gulp-sass'),
    sourcemaps    : require('gulp-sourcemaps'),
    autoPrefixer  : require('gulp-autoprefixer'),
    combineMq     : require('gulp-combine-mq'),
    cssNano       : require('gulp-cssnano')
  };

/*
  ** Config **
*/

  var tasks = {
    clean: {
    },

    images: {
      src: './build/images',
      dest: './media/images',
      exclude: './build/vectors',
      extensions: [
        'jpg',
        'png',
        'svg',
        'gif'
      ],
      plugins: {
        imageMin: {
          optimizationLevel: 3,
          progressive: true,
          interlaced: true
        }
      }
    },

    svgSprite: {
      src: './build/vectors',
      dest: './build/vectors',
      extensions: [
        'svg'
      ],
      plugins: {
        svgSprite: {
          shape: {
            dest: 'svg'
          },
          mode: {
            view: false,
            symbol: {
              sprite: 'main-symbol.svg'
            }
          }
        }
      }
    },

    js: {
      src: './build/js',
      dest: './media/js',
      extensions: [
        'js'
      ]
    },

    css: {
      src: './build/sass',
      dest: './media/css',
      extensions: [
        'sass',
        'scss'
      ],
      plugins: {
        autoPrefixer: [
          'last 2 versions'
        ],
        cssNano: {
          zindex: false,
          reduceIdents: false,
          mergeIdents: false,
          discardUnused: false
        }
      }
    }
  };

  /**
   * Returns list of sub folders within a directory
   * @param {string} str - path to directory
   * @return {array} array
  */
  function getFolders(dir) {
    return $.fs.readdirSync(dir)
      .filter(function(file) {
        return $.fs.statSync($.path.join(dir, file)).isDirectory();
      });
  }

  /**
   * Deletes dist directory
  */
function clean(){
    return $.del([root.dest]);
}

}

  /**
   * Optimise PNGs, JPGs, SVGs, and GIFs
  */
 function images(){
     return gulp.src([
        root.src+'/'+tasks.images.src+'/**/*',
        '!'+root.src+'/'+tasks.images.exclude+'/**/*'
    ]).pipe($.changed(root.dest+'/'+tasks.images.dest))
      .pipe($.util.env.production ? $.imageMin(tasks.images.plugins.imageMin) : $.util.noop())
      .pipe(gulp.dest(root.dest+'/'+tasks.images.dest+'/'));
 }


  /**
   * Merge SVGs into a sprite. One sprite is generated per directory within
   * 'img/vectors'
  */
  function svgSprite() {

    var folders = getFolders(root.src + '/' + tasks.svgSprite.src);

    var streams = folders.map(function(folder) {
      return gulp.src($.path.join(root.src + '/' + tasks.svgSprite.src + '/', folder, '/**/*.' + tasks.svgSprite.extensions))
        .pipe($.svgSprite(tasks.svgSprite.plugins.svgSprite))
        .pipe(gulp.dest(root.dest + '/' + tasks.svgSprite.dest + '/' + folder + '/'));
      });

    return $.mergeStream(streams);
  }

  /**
   * JSHint and minify javascript files
  */
  function js() {
    return gulp.src(root.src + '/' + tasks.js.src +  '/**/*.' + tasks.js.extensions)
      .pipe($.jsHint())
      .pipe($.jsHint.reporter('default'))
      .pipe($.util.env.production ? $.uglify() : $.util.noop())
      .pipe(gulp.dest(root.dest + '/' + tasks.js.dest + '/'));
  }

  /**
  * Clips empty files from the stream, sourcemaps (if not production),
  * autoprefixes css, combines media queries, minifies css
  */
  function css() {
    return gulp.src(root.src + '/' + tasks.css.src + '/**/*.' + tasks.css.extensions)
      .pipe($.clipEmptyFiles())
      .pipe(!$.util.env.production ? $.sourcemaps.init() : $.util.noop())
      .pipe(!$.util.env.production ? $.sass.sync().on('error', $.sass.logError) : $.util.noop())
      .pipe($.util.env.production ? $.sass.sync() : $.util.noop())
      .pipe($.autoPrefixer(tasks.css.plugins.autoPrefixer))
      .pipe(!$.util.env.production ? $.sourcemaps.write() : $.util.noop())
      .pipe($.util.env.production ? $.combineMq() : $.util.noop())
      .pipe($.util.env.production ? $.cssNano(tasks.css.plugins.cssNano) : $.util.noop())
      .pipe(gulp.dest(root.dest + '/' + tasks.css.dest + '/'));
  }

  /**
   * Watches files for changes
  */
  function watch() {
    gulp.watch(root.src + '/' + tasks.vendor.src + '/**/*', vendor);
    gulp.watch(root.src + '/' + tasks.images.src + '/**/*', images);
    gulp.watch(root.src + '/' + tasks.svgSprite.src + '/**/*', svgSprite);
    gulp.watch(root.src + '/' + tasks.js.src + '/**/*', js);
    gulp.watch(root.src + '/' + tasks.css.src + '/**/*', css);
  }

  /**
   * Combines clean, vendor, images, svgSprite, js and css tasks.
  */
  var build = gulp.series(
    clean,
    gulp.parallel(
      gulp.series(
        images,
        svgSprite
      ),
      js,
      css
    )
  );

  /**
   * Gulp tasks
  */
  exports.default = build;
  exports.watch = watch;
}());
