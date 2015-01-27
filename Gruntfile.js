module.exports = function(grunt) {

    // Add the grunt-mocha-test tasks.
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({
        // Configure a mochaTest task
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

    grunt.registerTask('default', 'mochaTest:test');
    grunt.registerTask('test-ci', 'mochaTest:ci');

};
