/**
 * Tiny Grunt 
 */

exports.description = "Create a small but powerful grunt file: server + livereload + bower + jshint"; 

// Don't overwrite anything 
exports.warnOn = ['*'];

exports.template = function(grunt, init, done) {

	// Custom prompts 
	init.prompts.main_file = {
		message: "Main Javascript file",
		default: "main.js"
	};

	init.prompts.base_dir = {
		message: "Base directory for the application to live in and be served from",
		default: "app"
	};

	// Ask the user questions, or go with the defaults 
	init.process({}, [
		init.prompt("name"),
		init.prompt("base_dir"),
		init.prompt("main_file"),
	], function(error, options) {

		// Copy everything from root into the new project folder 
		var files = init.filesToCopy();
		init.copyAndProcess(files, options);

		// Create the package.json file with all the dependencies that our grunt will need 
		init.writePackageJSON("package.json", {
			name: options.name,
			devDependencies: {
				"grunt": "~0.4.5",
				"grunt-contrib-concat": "~0.5.0",
				"grunt-contrib-watch": "~0.6.1",
			    "grunt-notify": "~0.4.1",
				"grunt-contrib-connect": "~0.8.0",
				"grunt-bower-concat": "~0.4.0",
				"grunt-contrib-jshint": "^0.10.0",
				"load-grunt-tasks": "~1.0.0",
			}
		});

	}); 



};