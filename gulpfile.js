var gulp = require("gulp");
var browserSync = require("browser-sync").create();

// 创建浏览器服务器并配置、初始化的事务
gulp.task("serve", function () {
    browserSync.init({
        server: {
            baseDir: "./www/"
        }
    });
});

// 自动刷新浏览器
gulp.task("reload", function () {
    browserSync.reload();
});

// 创建 copy 事务: 把所有 bower 下载的插件复制到 www 下
gulp.task("copy", function () {
    var path = "./bower_components";
    // copy jquery
    var q = [
        path + "/jquery/dist/jquery.js",
        path + "/jquery/dist/jquery.min.js"
    ];
    gulp.src(q).pipe(gulp.dest("./www/js/"));
    // copy bootstrap css, fonts, js
    var b = [
        path + "/bootstrap/dist/**/*.css",
        path + "/bootstrap/dist/**/glyphicons-halflings-regular.*",
        path + "/bootstrap/dist/**/*.js",
        "!" + path + "/bootstrap/dist/**/npm*.js"
    ];
    gulp.src(b).pipe(gulp.dest("./www/"));
    // copy angular css, js
    gulp.src(path + "/angular/*.css").pipe(gulp.dest("./www/css/"));
    gulp.src(path + "/angular/angular*.js").pipe(gulp.dest("./www/js/"));
    gulp.src("./src/favicon.ico").pipe(gulp.dest("./www/"));
});

// 拷贝超文本文件 *.html 到输出文件夹 www
gulp.task("html", function () {
    gulp.src([
        "./src/**/*.html",
        "./src/*.json",
        "!./src/**/_*.html",
        "!./src/**/*!.html"
    ]).pipe(gulp.dest("./www/"));
});

// 拷贝 css 到输出文件夹 www
gulp.task("css", function () {
    gulp.src([
        "./src/css/**/*.css",
        "!./src/css/**/_*.css"
    ]).pipe(gulp.dest("./www/css/"));
});

// 拷贝 js 到输出文件夹 www
gulp.task("js", function () {
    gulp.src([
        "./src/js/**/*.js",
        "!./src/js/**/_*.js"
    ]).pipe(gulp.dest("./www/js/"));
});

// 拷贝 images 到输出文件夹 www
gulp.task("img", function () {
    gulp.src([
        "./src/img/**/*.png",
        "./src/img/**/*.jpg",
        "./src/img/**/*.gif",
        "./src/img/**/*.mp4",
        "./src/img/**/*.webm",
        "!./src/img/**/_*.png",
        "!./src/img/**/_*.jpg",
        "!./src/img/**/_*.gif",
        "!./src/img/**/_*.mp4",
        "!./src/img/**/_*.webm",
    ]).pipe(gulp.dest("./www/img/"));
});

// 创建项目监视器，监视所有文件的状态
gulp.task("watch", function () {
    gulp.watch([
        "./src/**/*.html",
        "./src/*.json"

    ], ["html"]);
    gulp.watch("./src/css/**/*.css", ["css"]);
    gulp.watch("./src/js/**/*.js", ["js"]);
    gulp.watch([
        "./src/img/**/*.jpg",
        "./src/img/**/*.png",
        "./src/img/**/*.gif",
        "./src/img/**/*.mp4",
        "./src/img/**/*.webm",
    ], ["img"]);
    gulp.watch(["./www/*.html", "./www/css/*.css"], ["reload"]);
});

// 默认事务 default
gulp.task("default", [
    "copy",
    "html", "css", "js", "img",
    "serve", "watch"
]);