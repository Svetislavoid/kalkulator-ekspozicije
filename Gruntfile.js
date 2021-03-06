module.exports = function(grunt) {

  // configuration
  grunt.initConfig({
    // options to plugins, references to files etc.
    concat: {
      js: {
        src: ['js/*.js'],
        dest: 'build/main.js'
      },
      css: {
        src: ['css/*.css'],
        dest: 'build/main.css'
      }
    },
    import_js: {
      files: {
        expand: true,
        cwd: 'js/',
        src: ['**/main.js'],
        dest: 'build/',
        ext: '.js'
      }
    },
    uglify: {
      build: {
        files: [{
          src: 'build/main.js',
          dest: 'build/main.min.js'
        }]
      }
    },
    watch: {
      css: {
        files: ['css/*.css'],
        tasks: ['concat:css'],
      },
      js: {
        files: ['js/*.js'],
        tasks: ['import_js'],
      }
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-import-js');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // register tasks
  // grunt.registerTask('concat-js', ['concat:js']);
  // grunt.registerTask('concat-css', ['concat:css']);
  grunt.registerTask('build', ['import_js', 'concat:css']);

};
