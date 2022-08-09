var gulp = require('gulp')
var sass = require('gulp-sass')(require('sass'))
var postcss = require('gulp-postcss')
var path = require('path')
var exec = require('child_process').exec
var pug = require('gulp-pug')
var pug_locals = require('./pug-locals')

const BASE_DIR = '.'
const SRC_DIR = path.join(BASE_DIR, 'src')
const DEST_DIR = path.join(BASE_DIR, 'build')
const LIB_SRC_DIR = path.join(BASE_DIR, 'node_modules')
const LIB_DEST_DIR = path.join(DEST_DIR, 'libs')

/**
 * Clean DEST_DIR.
 */
function clean(cb) {
    exec(`rm -rf ${DEST_DIR}`, (err, stdout, stderr) => {
        console.log(stdout)
        console.log(stderr)
        cb(err)
    })
}
exports.clean = clean

/**
 * Compile SASS stylesheets.
 */
function stylesheets() {
    return gulp.src([path.join(SRC_DIR, '**/*.scss')])
        .pipe(sass.sync({includePaths: [SRC_DIR]}).on('error', sass.logError))
        .pipe(gulp.dest(DEST_DIR))
        .pipe(postcss())
        .pipe(gulp.dest(DEST_DIR))
}
exports.stylesheets = stylesheets

/**
 * Copy static files to the build directory.
 */
function copy_files() {
    return gulp.src(
        [
            path.join(SRC_DIR, '**/*'),
            '!' + path.join(SRC_DIR, '/**/*.{scss,pug}')
        ]
    ).pipe(gulp.dest(DEST_DIR))
}
exports.copy_files = copy_files

/**
 * Copy libraries to the build directory.
 */
function copy_libs() {
    return gulp.src(
        [
            path.join(LIB_SRC_DIR, '@tabler/**/*'),
        ]
    ).pipe(gulp.dest(LIB_DEST_DIR))
}
exports.copy_libs = copy_libs

/**
 * Compile Pug templates into HTML.
 */
function build_pug() {
    return gulp.src([path.join(SRC_DIR, '**/*.pug')])
        .pipe(pug({ "locals": pug_locals }))
        .pipe(gulp.dest(DEST_DIR))
}
exports.build_pug = build_pug

/**
 * Watch files for changes and rebuild when needed.
 */
function watch() {
    // Stylesheets
    gulp.watch([
        path.join(BASE_DIR, 'tailwind.config.js'),
        path.join(SRC_DIR, '**/*.{scss,pug}')
    ], stylesheets)

    // Pug templates
    gulp.watch([
        path.join(SRC_DIR, '**/*.pug')
    ], build_pug)

    // Other static files
    gulp.watch([
        path.join(SRC_DIR, '**/*'),
        '!' + path.join(SRC_DIR, '**/*.{scss,pug}')
    ], copy_files)
}
exports.watch = watch

/**
 * Run all build tasks.
 */
exports.all = gulp.series(
    stylesheets,
    build_pug,
    copy_files,
    copy_libs
)
