module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    meta: {
        srcPath: 'lib/',
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
    
    concat: {
      options: {
        banner: '<%= banner %>'
      },
      ratchet: {
        src: [
          '<%= meta.srcPath %>js/modals.js',
          '<%= meta.srcPath %>js/popovers.js',
          '<%= meta.srcPath %>js/push.js',
          '<%= meta.srcPath %>js/segmented-controllers.js',
          '<%= meta.srcPath %>js/sliders.js',
          '<%= meta.srcPath %>js/toggles.js'
        ],
        dest: '<%= meta.distPath %><%= pkg.name %>.js'
      }
    },
    
    sass: {
        options: {
          banner: '<%= banner %>',
          style: 'expanded',
        },
        dist: {
            files: {
                '<%= meta.distPath %><%= pkg.name %>.css': '<%= meta.srcPath %>sass/ratchet.scss',
                '<%= meta.distPath %>theme-classic.css': '<%= meta.srcPath %>sass/theme-classic.scss'
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

  // Load the plugins
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'concat']);
  grunt.registerTask('build', ['sass', 'concat']);
};