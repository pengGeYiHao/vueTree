
var gulp = require('gulp');
var del = require('del');
var gulpSequence = require('gulp-sequence');
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");

gulp.task('default',['sequence'], function() {
    console.log("项目构建成功");
});

gulp.task('sequence', gulpSequence('clean','webpack'));

gulp.task('clean', function(cb) {
    del(['dist/*.js','dist/*.css','dist/images','dist/*.html','dist/*.png','dist/style/*.css']);
    return cb();

});

gulp.task('webpack', function(cb) {
    webpack(webpackConfig, function (err, stats) {
        if (err){
            console.log("构建任务失败");
        }else{
            cb();
        }

    });
});
