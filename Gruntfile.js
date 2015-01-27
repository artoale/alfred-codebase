module.exports = function(grunt) {

    // Add the grunt-mocha-test tasks.
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        // Configure a mochaTest task
        watch: {
            test: {
                files: ['**/*.js'],
                tasks: ['mochaTest:test'],
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'nyan',
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                },
                src: ['test/**/*.spec.js']
            },
            ci: {
                options: {
                    reporter: 'dot',
                },
            }
        }
    });

    grunt.registerTask('default', 'watch');
    grunt.registerTask('test-ci', 'mochaTest:ci');

};
