const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const nunjucksRender = require("gulp-nunjucks-render");
const del = require("del");
const fileInclude = require("gulp-file-include");
const fonter = require("gulp-fonter");
const rename = require("gulp-rename");
const ttf2woff2 = require("gulp-ttf2woff2");
const browserSync = require("browser-sync").create();
const svgSprite = require("gulp-svg-sprite");
const autoprefixer = require("gulp-autoprefixer");

const htmlInclude = () => {
  return src(["app/html/*.html"]) // Находит любой .html файл в папке "html", куда будем подключать другие .html файлы
    .pipe(
      fileInclude({
        prefix: "@",
        basepath: "@file",
      })
    )
    .pipe(dest("app")) // указываем, в какую папку поместить готовый файл html
    .pipe(browserSync.stream());
};

function nunjucks() {
  return src("app/*.njk")
    .pipe(nunjucksRender())
    .pipe(dest("app"))
    .pipe(browserSync.stream());
}

function fonts() {
  return src("app/fonts/src/*.*")
    .pipe(
      fonter({
        formats: ["woff", "ttf"],
      })
    )
    .pipe(src("app/fonts/*.ttf"))
    .pipe(ttf2woff2())
    .pipe(dest("app/fonts"));
}

function scripts() {
  return src([
    "node_modules/jquery/dist/jquery.js",
    "node_modules/slick-carousel/slick/slick.js",
    "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js",
    "node_modules/rateyo/src/jquery.rateyo.js",
    "node_modules/nouislider/dist/nouislider.js",
    "node_modules/ion-rangeslider/js/ion.rangeSlider.js",
    "node_modules/jquery-form-styler/dist/jquery.formstyler.js",
    "app/js/main.js",
  ])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function svgSprites() {
  return src("app/images/ico/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest("app/images"));
}

function styles() {
  return src("app/scss/*.scss")
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 10 version"], grid: true })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function images() {
  return src("app/images/**/*.*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("dist/images"));
}

function build() {
  return src(
    [
      "app/**/*.html",
      "app/css/style.min.css",
      "!app/images/*.svg",
      "app/images/sprite.svg",
      "app/fonts/*.*",
      "app/js/main.min.js",
    ],
    {
      base: "app",
    }
  ).pipe(dest("dist"));
}

function cleanDist() {
  return del("dist");
}

function watching() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    notify: false,
  });
  watch(["app/**/*.scss"], styles);
  watch(["app/*.njk"], nunjucks);
  watch(["app/html/**/*.html"], htmlInclude);
  watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/**/*.html"]).on("change", browserSync.reload);
}

exports.htmlInclude = htmlInclude;
exports.styles = styles;
exports.fonts = fonts;
exports.scripts = scripts;
exports.watching = watching;
exports.svgSprites = svgSprites;
exports.images = images;
exports.nunjucks = nunjucks;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);

exports.default = parallel(
  styles,
  svgSprites,
  htmlInclude,
  scripts,
  nunjucks,
  watching
);
