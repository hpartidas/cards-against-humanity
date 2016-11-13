import gulp from "gulp";
import path from "path";
import rimraf from "rimraf";
import child_process from "child_process";
import webpackConfig from "./webpack.config";
import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";

const $ = require("gulp-load-plugins")();

gulp.task("server:clean", cb => {
    rimraf("./build", () => cb());
});

gulp.task(
    "server:build",
    gulp.series(
        "server:clean",
        serverCompile
    )
);

gulp.task(
    "server:watch",
    gulp.series(
        "server:build",
        serverWatch
    )
);

gulp.task(
    "server:dev",
    gulp.series(
        "server:build",
        gulp.parallel(
            serverWatch,
            serverRun
        )
    )
);

gulp.task(
    "server:test",
    gulp.series(
        "server:build",
        serverTest
    )
);

gulp.task(
    "server:test:dev",
    gulp.series(
        "server:build",
        gulp.parallel(
            serverWatch,
            serverRunTests
        )
    )
);

function serverCompile() {
    return gulp.src("./src/server/**/*.js")
        .pipe($.changed("./build"))
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.sourcemaps.write(".", {sourceRoot: path.join(__dirname, "src", "server")}))
        .pipe(gulp.dest("./build"));
}

function serverWatch() {
    return gulp
        .watch("./src/server/**/*.js", gulp.series(serverCompile))
        .on("error", () => {});
}

function serverRun() {
    return $.nodemon({
        script: "./server.js",
        watch: "build",
        ignore: ["**/__tests"],
        exec: "node --debug"
    });
}

function serverTest(cb) {
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

function serverRunTests() {
    return $.nodemon({
        script: "./tests.js",
        watch: "build"
    });
}

// --------------------------------------------------------
// Client
const consoleStats = {
    colors: true,
    exclude: ["node_modules"],
    chunks: false,
    assets: false,
    timrings: false,
    modules: false,
    hash: false,
    version: false
};

gulp.task("client:clean", cb => {
    rimraf("./build", () => cb());
});

gulp.task("client:build",
    gulp.series(
        "client:clean",
        clientBuild
    )
);

gulp.task("client:dev",
    gulp.series(
        "client:clean",
        clientWatch
    )
);


function clientBuild(cb) {
    webpack(webpackConfig, (err, stats) => {
        if (err) {
            cb(err);
            return;
        }

        console.log(stats.toString(consoleStats));
        cb();
    });
}

function clientWatch() {
    const compiler = webpack(webpackConfig);
    const server = new webpackDevServer(compiler, {
        publicPath: "/build/",
        hot: true,
        stats: consoleStats
    });

    server.listen(8080, () => {});
}

// --------------------------------------------------------
// Run Tasks
gulp.task("dev", gulp.parallel("server:dev", "client:dev"));
gulp.task("build", gulp.parallel("server:build", "client:build"));