/*!
 * Ratchet's Gruntfile
 * http://goratchet.com
 * Copyright 2014 Connor Sears
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 */

/* jshint node: true */
module.exports = function(grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var generateRatchiconsData = require('./grunt/ratchicons-data-generator.js');

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
            ' * Ratchet v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %> (https://github.com/twbs/ratchet/blob/master/LICENSE)\n' +
            ' *\n' +
            ' * v<%= pkg.version %> designed by @connors.\n' +
            ' * =====================================================\n' +
            ' */\n',

    clean: {
      dist: ['<%= meta.distPath %>', '<%= meta.docsPath %>']
    },

    concat: {
      ratchet: {
        options: {
          banner: '<%= banner %>'
        },
        src: [
          'js/modals.js',
          'js/popovers.js',
          'js/push.js',
          'js/segmented-controllers.js',
          'js/sliders.js',
          'js/toggles.js'
        ],
        dest: '<%= meta.distPath %>js/<%= pkg.name %>.js'
      }
    },

    sass: {
      options: {
        banner: '<%= banner %>',
        style: 'expanded',
        unixNewlines: true
      },
      dist: {
        files: {
          '<%= meta.distPath %>css/<%= pkg.name %>.css': 'sass/ratchet.scss',
          '<%= meta.distPath %>css/<%= pkg.name %>-theme-ios.css': 'sass/theme-ios.scss',
          '<%= meta.distPath %>css/<%= pkg.name %>-theme-android.css': 'sass/theme-android.scss',
          '<%= meta.docsAssetsPath %>css/docs.css': 'sass/docs.scss'
        }
      }
    },

    csscomb: {
      options: {
        config: 'sass/.csscomb.json'
      },
      dist: {
        files: {
          '<%= meta.distPath %>/css/<%= pkg.name %>.css': '<%= meta.distPath %>/css/<%= pkg.name %>.css',
          '<%= meta.distPath %>/css/<%= pkg.name %>-theme-android.css': '<%= meta.distPath %>/css/<%= pkg.name %>-theme-android.css',
          '<%= meta.distPath %>/css/<%= pkg.name %>-theme-ios.css': '<%= meta.distPath %>/css/<%= pkg.name %>-theme-ios.css'
        }
      },
      docs: {
        files: {
          '<%= meta.docsAssetsPath %>/css/docs.css': '<%= meta.docsAssetsPath %>/css/docs.css'
        }
      }
    },

    copy: {
      fonts: {
        expand: true,
        src: 'fonts/*',
        dest: '<%= meta.distPath %>/'
      },
      docs: {
        expand: true,
        cwd: '<%= meta.distPath %>',
        src: [
          '**/*'
        ],
        dest: '<%= meta.docsPath %>'
      }
    },

    cssmin: {
      options: {
        banner: '', // set to empty; see bellow
        keepSpecialComments: '*' // set to '*' because we already add the banner in sass
      },
      ratchet: {
        src: '<%= meta.distPath %>css/<%= pkg.name %>.css',
        dest: '<%= meta.distPath %>css/<%= pkg.name %>.min.css'
      },
      theme: {
        files: {
          '<%= meta.distPath %>css/<%= pkg.name %>-theme-ios.min.css': '<%= meta.distPath %>css/<%= pkg.name %>-theme-ios.css',
          '<%= meta.distPath %>css/<%= pkg.name %>-theme-android.min.css': '<%= meta.distPath %>css/<%= pkg.name %>-theme-android.css'
        }
      },
      docs: {
        src: [
          '<%= meta.docsAssetsPath %>css/docs.css',
          '<%= meta.docsAssetsPath %>css/pygments-manni.css'
        ],
        dest: '<%= meta.docsAssetsPath %>css/docs.min.css'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        compress: true,
        mangle: true,
        preserveComments: false
      },
      ratchet: {
        src: '<%= concat.ratchet.dest %>',
        dest: '<%= meta.distPath %>js/<%= pkg.name %>.min.js'
      },
      docs: {
        src: [
          '<%= meta.docsAssetsPath %>js/docs.js',
          '<%= meta.docsAssetsPath %>js/fingerblast.js'
        ],
        dest: '<%= meta.docsAssetsPath %>js/docs.min.js'
      }
    },

    watch: {
      scripts: {
        files: [
          '<%= meta.srcPath %>/**/*.scss'
        ],
        tasks: ['sass']
      }
    },

    jekyll: {
      docs: {}
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      grunt: {
        src: ['Gruntfile.js', 'grunt/*.js']
      },
      src: {
        src: 'js/*.js'
      },
      docs: {
        src: ['<%= meta.docsAssetsPath %>/js/docs.js', '<%= meta.docsAssetsPath %>/js/fingerblast.js']
      }
    },

    jscs: {
      options: {
        config: 'js/.jscsrc'
      },
      grunt: {
        src: '<%= jshint.grunt.src %>'
      },
      src: {
        src: '<%= jshint.src.src %>'
      },
      docs: {
        src: '<%= jshint.docs.src %>'
      }
    },

    csslint: {
      options: {
        csslintrc: 'sass/.csslintrc'
      },
      src: [
        '<%= meta.distPath %>/css/<%= pkg.name %>.css',
        '<%= meta.distPath %>/css/<%= pkg.name %>-theme-android.css',
        '<%= meta.distPath %>/css/<%= pkg.name %>-theme-ios.css'
      ],
      docs: {
        options: {
          ids: false
        },
        src: ['<%= meta.docsAssetsPath %>/css/docs.css']
      }
    },

    validation: {
      options: {
        charset: 'utf-8',
        doctype: 'HTML5',
        failHard: true,
        reset: true,
        relaxerror: [
          'Bad value apple-mobile-web-app-title for attribute name on element meta: Keyword apple-mobile-web-app-title is not registered.',
          'Bad value apple-mobile-web-app-status-bar-style for attribute name on element meta: Keyword apple-mobile-web-app-status-bar-style is not registered.',
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'Attribute ontouchstart not allowed on element body at this point.'
        ]
      },
      files: {
        src: '_site/**/*.html'
      }
    },

    sed: {
      versionNumber: {
        pattern: (function () {
          var old = grunt.option('oldver');
          return old ? RegExp.quote(old) : old;
        })(),
        replacement: grunt.option('newver'),
        recursive: true
      }
    }
  });

  // Load the plugins
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // Default task(s).
  grunt.registerTask('dist-css', ['sass', 'csscomb', 'cssmin']);
  grunt.registerTask('dist-js', ['concat', 'uglify']);
  grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js', 'copy', 'build-ratchicons-data']);
  grunt.registerTask('validate-html', ['jekyll', 'validation']);
  grunt.registerTask('build', ['dist']);
  grunt.registerTask('default', ['dist']);
  grunt.registerTask('test', ['dist', 'csslint', 'jshint', 'jscs', 'validate-html']);

  grunt.registerTask('build-ratchicons-data', generateRatchiconsData);

  // Version numbering task.
  // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
  // This can be overzealous, so its changes should always be manually reviewed!
  grunt.registerTask('change-version-number', 'sed');
};
