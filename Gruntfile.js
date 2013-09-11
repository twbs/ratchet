module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    meta: {
        srcPath: 'lib/sass/',
        distPath: 'dist/'
    },
    
    banner: '/*\n' +
            '* =====================================================\n' +
            '* Ratchet v<%= pkg.version %>\n' +
            '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            '* Licensed under <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
            '*\n' +
            '* Designed and built by @connors, @dhg, and @fat.\n' +
            '* =====================================================\n' +
            '*/\n',

    
    sass: {
        options: {
          banner: '<%= banner %>',
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