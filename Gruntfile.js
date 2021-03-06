'use strict';

module.exports = function(grunt) {
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Automatically load required Grunt tasks
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	});
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

		clean: {
			build: {
				src: ['dist/']
			}
		},

		useminPrepare: {
			html: 'index.html',
			options: {
				dest: 'dist'
			}
		},

		concat: {
			options: {
				separator: ';'
			},
			// dist configuration is provided by useminPrepare
			dist: {}
		},

		cssmin: {
			// dist configuration is provided by useminPrepare
			dist: {}
		},

		uglify: {
			options : {
				mangle : false
			},
			// dist configuration is provided by useminPrepare
			dist: {}
		},

		copy: {
			dist: {
				cwd: '',
				src: ['dev/**',
						'!dev/modules/**/*.js',
						'!dev/modules/**/*.css',
						'index.html', 'server.js',
						'!dev/main.css',
						'!dev/xWebApp.js',
						'!dev/button_circle.css',
						'DAO/*.js'],
				dest: 'dist',
				expand: true
			},
			fonts: {
				files: [{
					//for bootstrap fonts
					expand: true,
					dot: true,
					cwd: 'bower_components/bootstrap/dist',
					src: ['fonts/*.*'],
					dest: 'dist'
				}]
			},
			serve : {
				files : [{
					expand: true,
					dot: true,
					cwd: '',
					src: ['bower_components/components-font-awesome/{,*/}*.*'],
					dest: 'dist'
				}]
			},
			uigrid : {
				files : [{
					expand: true,
					dot: true,
					cwd: 'bower_components/angular-ui-grid',
					src : ['ui-grid.ttf', 'ui-grid.woff'],
					dest : 'dist/styles'
				}]
			}
		},


		filerev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 20
			},
			release: {
				// filerev:release hashes(md5) all assets (images, js and css)
				// in dist directory
				files: [{
					src: [
						'dist/scripts/*.js',
						'dist/styles/*.css'
					]
				}]
			}
		},

		// Replaces all assets with their reviewed version in html and css files.
		// options.assetDirs contains the directories fro finding the assets
		// according to their relative paths
		usemin: {
			html: ['dist/**/*.html'],
			css: ['dist/styles/*.css'],
			options: {
				assetDirs: ['dist', 'dist/styles']
			}
		}
	});

	grunt.registerTask('build', [
		'clean',
		'jshint',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'copy',
		'filerev',
		'usemin'
	]);

	grunt.registerTask('default', ['build']);


};