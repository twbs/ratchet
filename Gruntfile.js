module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    meta: {
        srcPath: 'lib/sass/',
        distPath: 'dist/'
    },
    
    banner: '/*!\n' +
              '* Ratchet v<%= pkg.version %> by @connors, @dhg, and @fat\n' +
              '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              '* Licensed under <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
              '*\n' +
              '* Designed and built by @connors, @dhg, and @fat.\n' +
              '*/\n',
    
    sass: {
        options: {
          banner: '/**\n' +
                  '* ==================================\n' +
                  '* Ratchet v2.0.0\n' +
                  '* Licensed under The MIT License\n' +
                  '* http://opensource.org/licenses/MIT\n' +
                  '* ==================================\n' +
                  '*/\n',
        },
        dist: {
            files: {
                '<%= meta.distPath %>ratchet.css': '<%= meta.srcPath %>ratchet.scss'
            }
        }
    },
 
    watch: {
        scripts: {
            files: [
                '<%= meta.srcPath %>/**/*.scss'
            ],
            tasks: ['sass']
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  //grunt.registerTask('default', ['uglify']);
  grunt.registerTask('default', ['sass']);

};