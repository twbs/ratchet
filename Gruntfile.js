module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    meta: {
      srcPath: 'lib/',
      distPath: 'dist/',
      docsPath: 'docs-assets/'
    },
    
    banner: '/*\n' +
            ' * =====================================================\n' +
            ' * Ratchet v<%= pkg.version %>\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
            ' *\n' +
            ' * Designed and built by @connors, @dhg, and @fat.\n' +
            ' * =====================================================\n' +
            ' */\n',
    
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
          '<%= meta.docsPath %>/css/docs.css': '<%= meta.srcPath %>sass/docs.scss',
          '<%= meta.distPath %>ios-theme.css': '<%= meta.srcPath %>sass/theme-ios.scss',
          '<%= meta.distPath %>android-theme.css': '<%= meta.srcPath %>sass/theme-android.scss'
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'concat']);
  grunt.registerTask('build', ['sass', 'concat']);
};
