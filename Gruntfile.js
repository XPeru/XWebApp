'use strict';

module.exports = function(grunt) {
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Automatically load required Grunt tasks
	require('jit-grunt')(grunt);
	//Define the configuration for all the tasks
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: {
				src: [
					'Gruntfile.js',
					'dev/xWebApp.js',
					'dev/modules/**/*.js'
				]
			}
		},

		copy: {
			dist: {
				cwd: 'dev',
				src: ['**', '!modules/**/*.js', '!modules/**/*.css', '!main.css', '!xWebApp.js'],
				dest: 'dist',
				expand: true
			}
		},

		clean: {
			build: {
				src: ['dist/']
			}
		}
	});

	grunt.registerTask('build', [
		'clean',
		'jshint'/*,
		'copy'*/
	]);

	grunt.registerTask('default', ['build']);
};