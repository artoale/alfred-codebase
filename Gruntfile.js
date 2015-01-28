module.exports = function(grunt) {
    'use strict';
    // Add the grunt-mocha-test tasks.
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-notify');

    grunt.initConfig({
        // Configure a mochaTest task
        watch: {
            test: {
                files: ['**/*.js'],
                tasks: ['test', 'notify:test'],
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
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
                    title: 'Lint and tests',
                    message: 'Fint lint-free and all test passed'
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
    grunt.registerTask('test', ['jshint', 'mochaTest:test']);
    grunt.registerTask('test-ci', ['jshint', 'mochaTest:ci']);
    grunt.task.run('notify_hooks');

};
