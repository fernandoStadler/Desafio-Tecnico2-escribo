const gulp = require('gulp');
const { exec } = require('child_process');

gulp.task('check-dependencies', function(done) {
    exec('npm ls --depth=0', function(err, stdout, stderr) {
        console.log(stdout);
        console.error(stderr);
        done(err);
    });
});

gulp.task('install-all-dependencies', function(done) {
    exec('npm install', function(err, stdout, stderr) {
        console.log(stdout);
        console.error(stderr);
        done(err);
    });
});


gulp.task('setup', gulp.series('check-dependencies', 'install-all-dependencies'));

