/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        meta:{
            version:'0.1.1',
            banner:'/*! JAM-BOILERPLATE - v<%= meta.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* http://PROJECT_WEBSITE/\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
                'YOUR_NAME; Licensed MIT */'
        },
        lint:{
            files:[
                'grunt.js',
                '../lib/**/*.js',
                '../blocks/**/*.js'
            ]
        },
        concat:{
            dist:{
                src:[
                    '../js/lib/jquery-1.8.2.min.js',
                    '../js/lib/plugins.js',
                    '../js/lib/chosen.jquery.js',
                    '../js/all.js'
                ],
                dest:'../publish/script.js'
            }
        },
        min:{
            dist:{
                src:'<config:concat.dist.dest>',
                dest:'../publish/script.min.js'
            }
        },
        csslint:{
            blocks:{
                src:'../blocks/**/*.css',
                rules:{
                    "import":false,
                    "overqualified-elements":2
                }
            }
        },
        jshint:{
            options:{
                curly:true,
                eqeqeq:true,
                immed:true,
                latedef:true,
                newcap:true,
                noarg:true,
                sub:true,
                undef:true,
                boss:true,
                eqnull:true,
                browser:true
            },
            globals:{
                jQuery:true
            }
        },
        uglify:{},

        less:{
            dev:{
                options:{
                },
                files:{
                    "../publish/style.css":"../blocks/love.less"
                }
            },
            production:{
                options:{
                    yuicompress:true
                },
                files:{
                    "../publish/style.css":"../blocks/love.less"
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-less');

    // main dev task
    grunt.registerTask('default', 'concat less:dev');

    // production
    grunt.registerTask('prod', 'concat less:production');

    grunt.registerTask('publish', 'concat lint styletto csslint min');

};
