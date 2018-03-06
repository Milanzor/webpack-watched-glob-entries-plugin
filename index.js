// Reqs:
// glob
// glob-base

const glob = require('glob');
const globBase = require('glob-base');
const path = require('path');

let directories = [];

/**
 * class WebpackWatchedGlobEntries
 */
class WebpackWatchedGlobEntries {

    /**
     *
     * @param globs
     * @param globOptions
     * @returns {Function}
     */
    static getEntries(globs, globOptions) {

        return function () {

            // Check if globs are provided properly
            if (typeof globs !== 'string' && !Array.isArray(globs)) {
                throw new TypeError('globOptions must be a string or an array of strings');
            }

            // Check globOptions if provided properly
            if (globOptions && typeof globOptions !== 'object') {
                throw new TypeError('globOptions must be an object');
            }

            // Make entries an array
            if (!Array.isArray(globs)) {
                globs = [globs];
            }

            //
            let globbedFiles = {};

            // Map through the globs
            globs.forEach(function (globString) {

                let globBaseOptions = globBase(globString);

                directories.push(globBaseOptions.base);

                // Get the globbedFiles
                let files = WebpackWatchedGlobEntries.getFiles(globString, globOptions);

                // Set the globbed files
                globbedFiles = Object.assign(files, globbedFiles);

            });

            return globbedFiles;
        }
    }

    /**
     *
     * @param globString
     * @param globOptions
     * @returns {{}}
     */
    static getFiles(globString, globOptions) {

        let files = {};
        let globBaseOptions = globBase(globString);

        glob.sync(globString, globOptions).forEach(function (file) {

            // Format the entryName
            let entryName = file.replace(globBaseOptions.base + '/', '');

            entryName = entryName.replace(path.extname(entryName), '');

            // Add the entry to the files obj
            files[entryName] = file;
        });

        return files;
    }

    /**
     * Install Plugin
     * @param {Object} compiler
     */
    apply(compiler) {
        if (compiler.hooks) {
            // Support Webpack >= 4
            compiler.hooks.afterCompile.tapAsync(this.constructor.name, this.afterCompile.bind(this));
        } else {
            // Support Webpack < 4
            compiler.plugin("after-compile", this.afterCompile);
        }
    }

    /**
     * After compiling, give webpack the globbed files
     * @param {Object} compilation 
     * @param {Function} callback 
     */
    afterCompile(compilation, callback) {
        if (Array.isArray(compilation.contextDependencies)) {
            // Support Webpack < 4
            compilation.contextDependencies = compilation.contextDependencies.concat(directories);
        } else {
            // Support Webpack >= 4
            for (const directory of directories) {
                compilation.contextDependencies.add(directory);
            }
        }
        callback();
    }
}

module.exports = WebpackWatchedGlobEntries;
