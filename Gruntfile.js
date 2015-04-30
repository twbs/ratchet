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
      distPath:       'dist/',
      docsAssetsPath: 'docs/assets/',
      docsDistPath:   'docs/dist/',
      docsPath:       'docs/',
      jsPath:         'js/',
      srcPath:        'sass/'
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
      dist: ['<%= meta.distPath %>', '<%= meta.docsDistPath %>']
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

    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            '<%= meta.distPath %>css/*.css',
            '<%= meta.docsAssetsPath %>css/docs.css'
          ]
        }
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
        dest: '<%= meta.docsDistPath %>'
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
        keepSpecialComments: '*' // keep all important comments
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
        compress: {
          warnings: false
        },
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
      options: {
        hostname: 'localhost',
        livereload: true,
        port: 8000
      },
      js: {
        files: '<%= meta.jsPath %>**/*.js',
        tasks: ['dist-js', 'copy']
      },
      css: {
        files: '<%= meta.srcPath %>**/*.scss',
        tasks: ['dist-css', 'copy']
      },
      html: {
        files: '<%= meta.docsPath %>**',
        tasks: ['jekyll']
      }
    },

    jekyll: {
      options: {
        config: '_config.yml'
      },
      docs: {},
      github: {
        options: {
          raw: 'github: true'
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyCSS: true,
          minifyJS: true,
          removeAttributeQuotes: true,
          removeComments: true
        },
        expand: true,
        cwd: '_site',
        dest: '_site',
        src: [
          '**/*.html'
        ]
      }
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

    htmllint: {
      options: {
        ignore: [
          'Attribute "ontouchstart" not allowed on element "body" at this point.',
          'Consider using the "h1" element as a top-level heading only (all "h1" elements are treated as top-level headings by many screen readers and other tools).'
        ]
      },
      src: '_site/**/*.html'
    },

    sed: {
      versionNumber: {
        pattern: (function () {
          var old = grunt.option('oldver');
          return old ? RegExp.quote(old) : old;
        })(),
        replacement: grunt.option('newver'),
        exclude: [
          'dist/fonts',
          'docs/assets',
          'fonts',
          'node_modules'
        ],
        recursive: true
      }
    },

    connect: {
      site: {
        options: {
          base: '_site/',
          hostname: 'localhost',
          livereload: true,
          open: true,
          port: 8000
        }
      }
    },

    compress: {
      main: {
        options: {
          archive: 'ratchet-<%= pkg.version %>-dist.zip',
          mode: 'zip',
          level: 9,
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**'],
            dest: 'ratchet-<%= pkg.version %>-dist'
          }
        ]
      }
    }
  });

  // Load the plugins
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // Default task(s).
  grunt.registerTask('dist-css', ['sass', 'autoprefixer', 'usebanner', 'csscomb', 'cssmin']);
  grunt.registerTask('dist-js', ['concat', 'uglify']);
  grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js', 'copy', 'build-ratchicons-data']);
  grunt.registerTask('validate-html', ['jekyll:docs', 'htmllint']);
  grunt.registerTask('build', ['dist']);
  grunt.registerTask('default', ['dist']);
  grunt.registerTask('test', ['dist', 'csslint', 'jshint', 'jscs', 'validate-html']);
  grunt.registerTask('server', ['dist', 'jekyll:docs', 'connect', 'watch']);
  grunt.registerTask('prep-release', ['dist', 'jekyll:github', 'htmlmin', 'compress']);

  grunt.registerTask('build-ratchicons-data', function () { generateRatchiconsData.call(this, grunt); });

  // Version numbering task.
  // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
  // This can be overzealous, so its changes should always be manually reviewed!
  grunt.registerTask('change-version-number', 'sed');
};
