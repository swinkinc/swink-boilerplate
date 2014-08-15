module.exports = function(grunt) {
	
	var port = grunt.option('port');

	// Config
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Compile main less file to main.min.css.
		less: {
			dist: {
				options: {
					compress: true,
					cleancss: true
				},
				files: {
					'lib/css/main.min.css': 'lib/css/main.less'
				}
			}
		},

		// Minify main & package js files.
		uglify: {
			dist: {
				files: {
					'lib/js/package.min.js': ['lib/js/package.js'],
					'lib/js/main.min.js': ['lib/js/main.js']
				}
			}
		},

		// Watch for changes in less files and compile / minify as needed.
		watch: {
			css: {
				files: ['lib/css/*.less'],
				tasks: ['less']
			},
			js: {
				files: ['lib/js/main.js', 'lib/js/package.js'],
				tasks: ['uglify']
			}
		},

		// Serve working directory to port 8888.
		shell: {
			serve: {
				command: 'python -m SimpleHTTPServer ' + port
			}
		},

		// Run server and watch tasks concurrently.
		concurrent: {
			dev: {
				tasks: ['watch', 'shell'],
				options: {
					logConcurrentOutput: true
				}
			}
		},

		// Copy delivery files to build folder.
		copy: {
			build : {
				src: ['./lib/**', './*.html'],
				dest: 'build/'
			}
		}

	});

	// Load tasks.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-shell');

	// Register tasks.

	// 'grunt' to compile less/js and serve on :8888.
	grunt.registerTask('default', ['concurrent']);
	// 'grunt serve' to serve on :8888.
	grunt.registerTask('serve', ['shell']);
	// 'grunt compile' to compile/minify all less/js.
	grunt.registerTask('compile', ['less', 'uglify']);
	// 'grunt build' to compile/minify and copy /lib and .html files to /build. Will add image optimization in the future.
	grunt.registerTask('build', ['less', 'uglify', 'copy']);

};
