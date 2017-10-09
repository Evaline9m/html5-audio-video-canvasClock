//加载gulp
var gulp = require("gulp");

var babel = require("gulp-babel"); //编译ES6

var sass = require("gulp-ruby-sass"); //编译scss

var connect = require("gulp-connect");  //即时刷新


gulp.task("refresh", function(){
	gulp.src("./*.html").pipe(connect.reload());
});

gulp.task("compilesass", function(){
	console.log('done');
	sass("./scss/*.scss", {
		style : "expanded"
	}).pipe( gulp.dest("./css/") );
})

gulp.task("default", function(){
	connect.server({
		livereload:true,
		port:8888
	});
	gulp.watch("./css/*.css", ["refresh"]);
	gulp.watch("./scss/*.scss", ["compilesass"]);
})