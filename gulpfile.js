const gulp = require('gulp');
const less = require('gulp-less');
const cached = require('gulp-cached');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const concat = require('gulp-concat');
const gulpFont2Base64 = require('gulp-font2base64');
const path = require('path');

const lessSrc = ['./pages/**/*.less', './components/**/*.less'];
const fontSrc = './fonts/*.ttf';
const appcssSrc = './app.css';

gulp.task('less', function () {
    gulp.src(lessSrc)
        .pipe(cached('less'))
        .pipe(less({
            // relativeUrls: true,
            globalVars: {
                lessroot: '"' + __dirname + '"'
            },
            // rootpath: path.resolve(__dirname, './')
        }))
        .pipe(replace(/(\d+)px/g, function (match, p1) {
            // 把px转成rpx
            return Number(p1) * 1 + 'rpx';
        }))
        .pipe(rename(function (path) {
            path.extname = '.wxss'
        }))
        .pipe(gulp.dest(function (r) {
            return r.base;
        }));
});

gulp.task('font2', function () {
    gulp.src(fontSrc)
        .pipe(gulpFont2Base64())
        .pipe(gulp.dest('./fonts/'));
});

gulp.task('concat', ['font2'], function () {
    gulp.src(['./app.css', './fonts/iconfont.ttf.css', './fonts/iconfont.css'])
        .pipe(concat('app.wxss'))
        .pipe(gulp.dest('./'));
})

gulp.task('default', ['concat'], function () {
    gulp.watch(lessSrc, ['less']);
    gulp.watch([fontSrc, appcssSrc], ['concat']);
});