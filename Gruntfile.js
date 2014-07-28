module.exports = function(grunt) {

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

		// Watch for changes in less or js and compile / minify as needed.
		watch: {
			css: {
				files: ['lib/css/*.less'],
				tasks: ['less']
			},
			js: {
				files: ['lib/js/package.js', 'lib/js/main.js'],
				tasks: ['uglify']
			}
		},

		// Serve working directory to port 8888.
		shell: {
			serve: {
				command: 'python -m SimpleHTTPServer 8888'
			}
		},

		// Run server and watch tasks concurrently.
		concurrent: {
			develop: {
				tasks: ['watch', 'shell'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});

	// Load tasks.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-shell');

	// Register tasks.
	grunt.registerTask('default', ['concurrent']);
	grunt.registerTask('serve', ['shell:serve']);
	grunt.registerTask('compile', ['less', 'uglify']);

};