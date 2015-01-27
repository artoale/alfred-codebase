module.exports = function(grunt) {

    // Add the grunt-mocha-test tasks.
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    grunt.initConfig({
        // Configure a mochaTest task
        watch: {
            test: {
                files: ['**/*.js'],
                tasks: ['mochaTest:test', 'notify:test'],
            }
        },
        notify_hooks: {
            options: {
                enabled: true,
                // success: true, // whether successful grunt executions should be notified automatically
                duration: 3 // the duration of notification in seconds, for `notify-send only
            },
        },
        notify: {
            test: {
                options: {
                    title: 'Mocha',
                    message: 'All test passed'
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                },
                src: ['test/**/*.spec.js']
            },
            ci: {
                options: {
                    reporter: 'dot',
                },
                src: ['test/**/*.spec.js']
            }
        }
    });

    grunt.registerTask('default', 'watch');
    grunt.registerTask('test-ci', 'mochaTest:ci');
    grunt.task.run('notify_hooks');

};
