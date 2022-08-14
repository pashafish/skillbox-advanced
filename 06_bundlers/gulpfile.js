const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoPrefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const del = require('del');


const stylesDev = () => {
  return src('src/css/**/*.css')
  .pipe(sourcemaps.init())
  .pipe(concat('main.css'))
  .pipe(autoPrefixer({
    cascade: false
  }))
  .pipe(cleanCSS({
    level: 2
  }))
  .pipe(sourcemaps.write())
  .pipe(dest('dist/css'))
  .pipe(browserSync.stream())
}

const stylesProd = () => {
  return src('src/css/**/*.css')
  .pipe(concat('main.css'))
  .pipe(autoPrefixer({
    cascade: false
  }))
  .pipe(cleanCSS({
    level: 2
  }))
  .pipe(dest('dist/css'))
  .pipe(browserSync.stream())
}

const htmlMinify = () => {
  return src('src/*.html')
  .pipe(htmlMin({
    collapseWhitespace: true
  }))
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('src/img/svg/**/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: { sprite: '../sprite.svg' }
    }
  }))
  .pipe(dest('dist/img'))
  .pipe(browserSync.stream())
}

const images = () => {
  return src(['src/img/*.png',
              'src/img/*.jpg',
              'src/img/*.svg',
              'src/img/*.jpeg'])
  .pipe(image())
  .pipe(dest('dist/img'))
  .pipe(browserSync.stream())
}

const scriptsDev = () => {
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

const scriptsProd = () => {
  return src('src/js/**/*.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('main.js'))
  .pipe(uglify().on('error', notify.onError()))
  .pipe(dest('dist/js'))
  .pipe(browserSync.stream())
}

const whatchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

const clean = () => {
  return del('dist')
}

const resources = () => {
  return src('src/plugin/**')
  .pipe(dest('dist/plugin'))
}

watch('src/*.html', htmlMinify);
watch('src/css/**/*.css', stylesDev);
watch('src/img/svg/**/*.svg', svgSprites);
watch(['src/img/*.png', 'src/img/*.jpg', 'src/img/*.svg', 'src/img/*.jpeg'], images);
watch('src/js/**/*.js', scriptsDev);

exports.dev = series(clean, htmlMinify, stylesDev, svgSprites, images, scriptsDev, resources, whatchFiles);
exports.prod = series(clean, htmlMinify, stylesProd, svgSprites, images, scriptsProd, resources, whatchFiles);
