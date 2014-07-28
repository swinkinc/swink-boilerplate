module.exports = function(grunt) {

	// Config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
		uglify: {
			main: {
				files: {
					'lib/js/package.min.js': ['lib/js/package.js'],
					'lib/js/main.min.js': ['lib/js/main.js']
				}
			}
		},
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
		shell: {
			serve: {
				command: 'python -m SimpleHTTPServer 8888'
			}
		},
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
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');

	// Register tasks.
	grunt.registerTask('default', ['concurrent']);

};