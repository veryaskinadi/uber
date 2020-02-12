const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");


// gulp.task('server', function() {

//     browserSync({
//         server: {
//             baseDir: "src"
//         }
//     });

//     gulp.watch("src/*.html").on('change', browserSync.reload);
// });

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('css', function() {
    return gulp.src("src/css/**/*.css")
        .pipe(gulp.dest("docs/css"));
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
});

gulp.task('scripts', function() {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("docs/js"));
});

gulp.task('html', function() {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("docs/"));
});

gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("docs/fonts"));
});

gulp.task('images', function() {
    return gulp.src("src/img/**/*")
        .pipe(gulp.dest("docs/img"));
});

gulp.task('default', gulp.parallel('css', 'watch', /*'server', */'styles', 'scripts', 'html', 'fonts', 'images'));