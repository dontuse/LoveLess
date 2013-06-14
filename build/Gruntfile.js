/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        meta: {
            version: '0.1.1',
            skb: '/*! JAM-BOILERPLATE - v<%= meta.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* http://PROJECT_WEBSITE/\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
                'YOUR_NAME; Licensed MIT */'
        },
        concat: {
            dist: {
                src: [
                    '../js/lib/jquery-1.7.2.js',
                    '../js/lib/tiny-pubsub.js'
                ],
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
        jade: {
            compile: {
                options: {
                    data: {
                        debug: true
                    },
                    pretty : true
                },
                files: {
                    "../publish/index.html": ["../pages/index.jade"]
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
    grunt.registerTask('default', [ 'jade', 'concat' , 'less:dev']);

    // production
    grunt.registerTask('prod', ['concat', 'uglify' , 'less:production']);


    grunt.registerTask('watcher', ['concat', ' less:dev']);

};