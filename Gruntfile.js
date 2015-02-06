/*!
 * Ratchet's Gruntfile
 * http://goratchet.com
 * Copyright 2015 Connor Sears
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 */

/* jshint node: true */
module.exports = function (grunt) {
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
      srcPath:        'sass/',
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
          'js/common.js',
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
        sourcemap: 'none',
        style: 'expanded',
        unixNewlines: true
      },
      core: {
        src: 'sass/ratchet.scss',
        dest: '<%= meta.distPath %>css/<%= pkg.name %>.css'
      },
      android: {
        src: 'sass/theme-android.scss',
        dest: '<%= meta.distPath %>css/<%= pkg.name %>-theme-android.css'
      },
      ios: {
        src: 'sass/theme-ios.scss',
        dest: '<%= meta.distPath %>css/<%= pkg.name %>-theme-ios.css'
      },
      docs: {
        src: 'sass/docs.scss',
        dest: '<%= meta.docsAssetsPath %>css/docs.css'
      }
    },

    csscomb: {
      options: {
        config: 'sass/.csscomb.json'
      },
      core: {
        files: {
          '<%= sass.core.dest %>': '<%= sass.core.dest %>'
        }
      },
      android: {
        files: {
          '<%= sass.android.dest %>': '<%= sass.android.dest %>'
        }
      },
      ios: {
        files: {
          '<%= sass.ios.dest %>': '<%= sass.ios.dest %>'
        }
      },
      docs: {
        files: {
          '<%= sass.docs.dest %>': '<%= sass.docs.dest %>'
        }
      }
    },

    copy: {
      fonts: {
        expand: true,
        src: 'fonts/*',
        dest: '<%= meta.distPath %>'
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

    autoprefixer: {
      options: {
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24', // Firefox 24 is the latest ESR
          'Explorer >= 9',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ]
      },
      core: {
        src: '<%= sass.core.dest %>'
      },
      android: {
        options: {
          browsers: [
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24', // Firefox 24 is the latest ESR
            'Opera >= 12'
          ]
        },
        src: '<%= sass.android.dest %>'
      },
      ios: {
        options: {
          browsers: ['iOS >= 6']
        },
        src: '<%= sass.ios.dest %>'
      },
      docs: {
        src: '<%= sass.docs.dest %>'
      }
    },

    cssmin: {
      options: {
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
          '<%= meta.srcPath %>**/*.scss'
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
          'Attribute ontouchstart not allowed on element body at this point.',
          'Consider using the h1 element as a top-level heading only \\(all h1 elements are treated as top-level headings by many screen readers and other tools\\)\\.'
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
  grunt.registerTask('dist-css', ['sass', 'autoprefixer', 'csscomb', 'cssmin']);
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
