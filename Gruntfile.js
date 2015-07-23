module.exports = function(grunt) {
	//project configuration
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.initConfig({
		

		pkg: grunt.file.readJSON('package.json'),


		clean: {
			styles: {
				src: ['./assets/css/lib.css']
			},
			libScripts: {
				src: ['./assets/js/lib.js']
			},
			localScripts: {
				src: ['./assets/js/main.js',
						'./assets/js/controllers',
						'./assets/js/services']
			}
		},

		browserSync: {
            dev: {
                files: {
                    src : [
                    	'./**.html',
                        './app/**/*.js',
                        './assets/**/*.js',
                        './assets/css/*.css',
                        './index.html'  
                    ],
                }
            }
  
        },

		watch: {
			styles: {
				files: ['./assets/**/*.css',
						'!./assets/css/lib.css'],
				tasks: ['clean:styles', 'concat_css']
			},
			localScripts:
			{
				files: ['app/**/*.js',
						'app/*.js' ],
				tasks: ['clean:localScripts', 'concat:localMain', 'concat:localSevices', 'concat:localControllers']
			},
			gruntEdit: {
				files: ['Gruntfile.js'],
				tasks: ['clean', 'concat', 'concat_css', 'watch']
			}

		},

		

		concat: {
			
			localMain:
			{
				src: [	'app/main.module.js',
						'app/main.routes.js'
						],
				dest: 'assets/js/main.js'
			},
			localSevices:
			{
				src: ['app/**/services.js'],
				dest: 'assets/js/services.js'

			},
			localControllers:
			{
				src: ['app/**/controllers.js'],
				dest:'assets/js/controllers.js'
			},
			libScripts: 
			{
				src: ['./assets/libs/angular/angular.js',
					  './assets/libs/angular-google-maps/dist/angular-google-maps.js',
					  './assets/libs/lodash/lodash.js',
					  './assets/libs/angular-bootstrap/ui-bootstrap.js',
					  './assets/libs/angular-bootstrap/ui-bootstrap-tpls.js',
					  './assets/libs/angular-cookies/angular-cookies.js',
					  './assets/libs/angular-crypto/angular-crypto.js',
					  './assets/libs/angular-route/angular-route.js'],
				dest: './assets/js/lib.js'
			}

		},
		concat_css: {
			options: 
			{
			},
			styles:
			{

				src: [ './assets/css/*.css',
						'./assets/lib/bootstrap-additions/dist/modules.bootstrap-additions.css',
						'./assets/lib/bootstrap/css/bootstrap.css',
						'!assets/css/lib.css'],
				dest: './assets/css/lib.css'
			}

		}


	});

	grunt.registerTask('default', ['clean', 'concat', 'concat_css', 'watch', 'browserSync']);

	
}