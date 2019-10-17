const gulp = require('gulp');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const gap = require('gulp-append-prepend');
const watch = require('gulp-watch');
const normalizeUrl = require('normalize-url');
const babel = require('gulp-babel');


sass.compiler = require('node-sass');

const DEV_PATH = __dirname;

global.DEV_PATH = DEV_PATH;

const config = require( DEV_PATH + '/package.json');








/*
combine js files to main.js
*/
gulp.task('js', function () {
	
  gulp.src(DEV_PATH + '/source/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('search.min.js'))
    .pipe(babel({
       presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(replace(/\\n+/g, ''))
    .pipe(replace(/\s+/g, ' '))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DEV_PATH + '/dist/'));
  
});



/*
npm run dev
*/
gulp.task('default',['js'], function () {
      
    watch( DEV_PATH + '/source/**/*.js', function () {
      gulp.start('js');
    });
  
});
