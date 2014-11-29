module.exports = function(grunt) {

	var options = grunt.file.readJSON("package.json");

	// Port (live reload will be one up, so 4444 has 4445 as livereload)
	var port = 4444; 

	// Configure 
	grunt.initConfig({
		pkg : options,

		// Combine bower components in the correct order 
		bower_concat: {
			target: {
				dest: "bower_components/combined.js"
			}
		},

		// Combine all javascript files in base/js, placing the main_file at the end  
		concat: {
			target: {
				src: [
					"bower_components/combined.js", 
					"{%= base_dir %}/js/**", 
					"!{%= base_dir %}/js/{%= main_file %}", 
					"{%= base_dir %}/js/{%= main_file %}"
				],
				dest: "{%= base_dir %}/index.js"
			},

			// Source map for easy debugging  
			options: {
				sourceMap: true
			}
		}, 

		// Checks for any issues in Javascript code 
		jshint: {
			target: {
				src: [
					"Gruntfile.js", 
					"{%= base_dir %}/js/**"
				]
			}
		},

		// Watch for changes to re-concat, and host a livereload server 
		watch: {
			options: {
				livereload: (port + 1)
			},
			app: {
				files: [
					"Gruntfile.js",
					"bower_components/combined.js", 
					"{%= base_dir %}/**",
					"!{%= base_dir %}/index.js*"
				],
				tasks: ["jshint", "concat"]
			},
			bower: {
				files: ["bower_components/**", "!bower_components/combined.js"],
				tasks: ["bower_concat"]
			}
		},
		
		// Start a web server
		connect: {
			server: { 
				options: {
					base: "{%= base_dir %}",

					// Serve only to localhost - change to * to make it available from anywhere
					hostname: "localhost", 
					port: port,

					// Automatically inject livereload tags into pages
					livereload: (port + 1),

					// Open in a browser when you run grunt 
					open: true
				}
			}
		}

	});

	// Instead of using grunt.loadNpmTasks for each plugin, we use load-grunt-tasks to 
	// find everything that looks like a grunt plugin from package.json 
	require("load-grunt-tasks")(grunt);

	grunt.registerTask("default", ["bower_concat", "jshint", "concat", "connect", "watch"]); 

};