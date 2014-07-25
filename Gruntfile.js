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
		watch: {
			css: {
				files: ['lib/css/*.less'],
				tasks: ['less']
			}
		}
	});

	// Load tasks.
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register tasks.
	grunt.registerTask('default', ['watch']);

};