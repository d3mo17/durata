var fs = require('fs'),
    gulp = require('gulp'),
    rjs = require('requirejs'),
    UglifyJS = require('uglify-js');

gulp.task('distribute', function () {
    return new Promise(_optimize);

    /**
     * @param {function} resolve
     * @param {string} optimizeType
     * @param {string} targetFile
     * @param {string} whatHappens
     * @private
     */
    function _optimize(resolve, reject) {
        rjs.optimize({
            optimize: 'none',

            baseUrl: 'src',
            paths: {
                'durata': 'Durata'
            },
            include: [
                'durata'
            ],
            out: function (text, sourceMapText) {
                fs.writeFileSync('dist/durata.js', text);
                fs.writeFileSync(
                    'dist/durata.min.js',
                    UglifyJS.minify(text, {compress: {sequences: false}}).code
                );
            },
            wrap: {
                end: ["if (typeof define === 'function' && define.amd) {\n",
                    "    define(['durata'], function (Durata) { return Durata; });\n",
                    "}\n"
                ].join('')
            },

            preserveLicenseComments:	false,
            skipModuleInsertion:		true,
            findNestedDependencies:		true
        }, function (buildResponse) {
            console.log(buildResponse);
            resolve(buildResponse);
        });
    }
});
