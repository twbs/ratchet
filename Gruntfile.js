/* ----------------------------------
 * Ratchet's Gruntfile
 * Licensed under The MIT License
 * http://opensource.org/licenses/MIT
 * ---------------------------------- */

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    meta: {
      distPath:       'dist/',
      docsPath:       'docs/dist/',
      docsAssetsPath: 'docs/assets/'
    },
    
    banner: '/*!\n' +
            ' * =====================================================\n' +
            ' * Ratchet v<%= pkg.version %>\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
            ' *\n' +
            ' * V<%= pkg.version %> designed by @connors.\n' +
            ' * =====================================================\n' +
            ' */\n',
    
    concat: {
      options: {
        banner: '<%= banner %>'
      },
      ratchet: {
        src: [
          'js/modals.js',
          'js/popovers.js',
          'js/push.js',
          'js/segmented-controllers.js',
          'js/sliders.js',
          'js/toggles.js'
        ],
        dest: '<%= meta.distPath %><%= pkg.name %>.js'
      },
      docs: {
        src: '<%= meta.distPath %><%= pkg.name %>.js',
        dest: '<%= meta.docsPath %><%= pkg.name %>.js'
      }
    },
    
    sass: {
      options: {
        banner: '<%= banner %>',
        style: 'expanded',
      },
      dist: {
        files: {
          '<%= meta.distPath %><%= pkg.name %>.css': 'sass/ratchet.scss',
          '<%= meta.distPath %><%= pkg.name %>-theme-ios.css': 'sass/theme-ios.scss',
          '<%= meta.distPath %><%= pkg.name %>-theme-android.css': 'sass/theme-android.scss',
          '<%= meta.docsAssetsPath %>css/docs.css': 'sass/docs.scss'
        }
      }
    },

    copy: {
      docs: {
        expand: true,
        cwd: 'dist',
        src: [
          '*'
        ],
        dest: 'docs/dist'
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
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});


  // Default task(s).
  grunt.registerTask('default', ['sass', 'concat', 'copy']);
  grunt.registerTask('build', ['sass', 'concat', 'copy']);
};
