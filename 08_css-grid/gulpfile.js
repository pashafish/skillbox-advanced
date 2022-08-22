const {src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const autoPrefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const img = require('gulp-image');
const svg = require('gulp-svg-sprite');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

const pugToHtml = () => {
  return src('src/pug/*.pug')
  .pipe(pug())
  .pipe(dest('dist/'))
  .pipe(browserSync.stream())
}

const sassToCss = () => {
  return src('src/scss/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoPrefixer({
    cascade: false
  }))
  .pipe(cleanCSS({
    level: 2
  }))
  .pipe(dest('dist/css'))
  .pipe(browserSync.stream())
}

const styles = () => {
  return src('src/css/**/*.css')
  .pipe(autoPrefixer({
    cascade: false
  }))
  .pipe(cleanCSS({
    level: 2
  }))
  .pipe(dest('dist/css'))
  .pipe(browserSync.stream())
}

const svgSprite = () => {
  return src('src/img/svg/**/*.svg')
  .pipe(svg({
    mode: {
      symbol: {
        sprite: '../sprite.svg'
      }
    }
  }))
  .pipe(dest('dist/img'))
  .pipe(browserSync.stream())
}

const images = () => {
  return(src(['src/img/*.jpg', 'src/img/*.png', 'src/img/*.svg', 'src/img/*.jpeg']))
  .pipe(img())
  .pipe(dest('dist/img'))
  .pipe(browserSync.stream())
}

const scriptsDev= () => {
  return src('src/js/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('main.js'))
  .pipe(uglify().on('error', notify.onError()))
  .pipe(sourcemaps.write())
  .pipe(dest('dist/js'))
  .pipe(browserSync.stream())
}

const scriptsProd= () => {
  return src('src/js/**/*.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('main.js'))
  .pipe(uglify().on('error', notify.onError()))
  .pipe(dest('dist/js'))
  .pipe(browserSync.stream())
}

const clean = () => {
  return del(['dist'])
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

watch('src/pug/*.pug', pugToHtml);
watch('src/css/**/*.css', styles);
watch('src/scss/**/*.scss', sassToCss);
watch('src/js/**/*.js', scriptsDev);
watch('src/img/svg/**/*.svg', svgSprite);
watch(['src/img/*.jpg', 'src/img/*.png', 'src/img/*.svg', 'src/img/*.jpeg'], images);

exports.default = series( clean, pugToHtml, sassToCss, styles, scriptsDev, svgSprite, images, watchFiles );
exports.prod = series( clean, pugToHtml, sassToCss, styles, scriptsProd, svgSprite, images, watchFiles );
