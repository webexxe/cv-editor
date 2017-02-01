//----------------------------------------------------------------------------------------------------------------//
//GULP REQUIRE
var
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    jade = require('gulp-jade'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    reload = browserSync.reload,

    vendor_js = ['node_modules/jquery/dist/jquery.js'],
    vendor_css = ['node_modules/normalize-css/normalize.css'];

//----------------------------------------------------------------------------------------------------------------//
//GULP TASKS

gulp
    .task('css', function () {
        gulp.src('_app/sass/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(autoprefixer({browsers: ['last 2 versions', '> 5%', 'Firefox ESR']}))
            .pipe(gulp.dest('www/css/'));
        gulp.src(vendor_css[0])
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(concat('vendor.css'))
            .pipe(gulp.dest('www/css/'));
    })

    .task('jade', function () {
        gulp.src(['_app/jade/*.jade', '_app/jade/_files/*.jade', '!_app/jade/_*.jade'])
            .pipe(jade({
                pretty: true
            }))
            .pipe(gulp.dest('www/'))
            .pipe(reload({stream: true}));
    })

    .task('scripts', function () {
        gulp.src(['_app/js/**/*.js', '!_app/js/**/_*.js'])
            .pipe(uglify({mangle: false}))
            .pipe(concat('scripts.js'))
            .pipe(gulp.dest('www/js'));
        gulp.src(vendor_js)
            .pipe(uglify())
            .pipe(concat('vendor.js'))
            .pipe(gulp.dest('www/js'))
            .pipe(reload({stream: true}))
    })

    .task('browser-sync', function () {
        browserSync({
            files: 'www/**/*',
            server: {
                baseDir: 'www/'
            },
            https: false,
            port: 1923
        });
    })

    //-------------------------------------------------------------------------------------------------------------//
    //GULP START
    .task('watch', function () {
        gulp.watch('_app/sass/**/*.scss', ['css']);
        gulp.watch('_app/jade/**/*.jade', ['jade']);
        gulp.watch('_app/js/**/*.js', ['scripts']);
    })

    .task('default', ['jade', 'css', 'scripts', 'browser-sync', 'watch']);