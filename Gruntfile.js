module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
              '* Ratchet v<%= pkg.version %> by @connors, @dhg, and @fat\n' +
              '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              '* Licensed under <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
              '*\n' +
              '* Designed and built by @connors, @dhg, and @fat.\n' +
              '*/\n',
    uglify: {
      options: {
        banner: ''
      },
      gbuild: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }

    sass: {
      dist : {
        files: [{
        expand: true,
        cwd: 'ratchet',
        src: ['lib/scss/*.scss'],
        dest: 'dist',
        ext: '.css'
      }]
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};

grunt.loadNpmTasks('grunt-contrib-sass');

grunt.registerTask('default', ['sass']);