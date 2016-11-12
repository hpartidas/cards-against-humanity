import gulp from "gulp";
import path from "path";
import rimraf from "rimraf";
import child_process from "child_process";

const $ = require("gulp-load-plugins")();

gulp.task("server:clean", cb => {
    rimraf("./build", () => cb());
});

gulp.task(
    "server:build",
    gulp.series(
        "server:clean",
        compile
    )
);

gulp.task(
    "server:watch",
    gulp.series(
        "server:build",
        watch
    )
);

gulp.task(
    "server:dev",
    gulp.series(
        "server:build",
        gulp.parallel(
            watch,
            run
        )
    )
);

gulp.task(
    "server:test",
    gulp.series(
        "server:build",
        test
    )
);

gulp.task(
    "server:test:dev",
    gulp.series(
        "server:build",
        gulp.parallel(
            watch,
            runTests
        )
    )
);

function compile() {
    return gulp.src("./src/server/**/*.js")
        .pipe($.changed("./build"))
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.sourcemaps.write(".", {sourceRoot: path.join(__dirname, "src", "server")}))
        .pipe(gulp.dest("./build"));
}

function watch() {
    return gulp
        .watch("./src/server/**/*.js", gulp.series(compile))
        .on("error", () => {});
}

function run() {
    return $.nodemon({
        script: "./server.js",
        watch: "build",
        ignore: ["**/__tests"]
    });
}

function test(cb) {
    child_process.exec("node ./tests.js", (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);

        if (err) {
            cb(new $.util.PluginError("test", "Tests failed"));
        } else {
            cb();
        }
    });
}

function runTests() {
    return $.nodemon({
        script: "./tests.js",
        watch: "build"
    });
}