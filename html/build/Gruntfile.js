/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        concat: {
            dist: {
                src:  grunt.file.readJSON('js.js'),
                dest: '../publish/script.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    '../publish/script.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        less: {
            dev: {
                options: {
                },
                files: {
                    "../publish/style.css": "../blocks/love.less"
                }
            },
            production: {
                options: {
                    yuicompress: true
                },
                files: {
                    "../publish/style.css": "../blocks/love.less"
                }
            }
        },
        watch: {
            scripts: {
                files: '<%= concat.dist.src %>',
                tasks: 'concat'
            },
            css: {
                files: [
                    '../blocks/**/*.less'
                ],
                tasks: ['concat','less:dev']
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');

    // main dev task
    grunt.registerTask('default', [ 'concat' , 'less:dev']);

    // production
    grunt.registerTask('prod', ['concat', 'uglify' , 'less:production']);


    grunt.registerTask('watcher', ['concat', ' less:dev']);

};