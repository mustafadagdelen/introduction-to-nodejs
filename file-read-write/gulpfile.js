const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');
const inspector = require('gulp-node-inspector');
const open = require('gulp-open');


gulp.task('livereload', ()=>{
	gulp.src([]).pipe(livereload());
});

gulp.task('nodemon', ['livereload'], ()=>{
	livereload.listen();
	nodemon({
		script: 'app.js',
		ext: 'js coffee handlebars',
		exec: 'node --debug',
		stdout: false,
		verbose: true,
		quiet: true
	}).on('readable', function () {
		this.stdout.on('data', function (chunk) {
			if(/^Express server listening on port/.test(chunk)){
				livereload.changed(__dirname);
			}
		});
		this.stdout.pipe(process.stdout);
		this.stderr.pipe(process.stderr);
	});

	gulp.src(__filename).pipe(open({uri: 'http://127.0.0.1:8080/?port=5858'}));

	return;
})

gulp.task('inspector', ()=>{
	const inspectorOptions = {
	};

	gulp.src([])
		.pipe(inspector(inspectorOptions));
	return;
});

gulp.task('default', [
	'inspector',
	'nodemon'
]);
