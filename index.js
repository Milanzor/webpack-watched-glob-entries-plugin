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
     * @param pluginOptions_
     * @returns {Function}
     */
    static getEntries(globs, globOptions, pluginOptions_) {

        if (typeof pluginOptions_ !== 'undefined' && typeof pluginOptions_ !== 'object') {
            throw new TypeError('pluginOptions_ must be an object');
        }

        // Options defaults
        const pluginOptions = Object.assign({
            basename_as_entry_id: false
        }, pluginOptions_);


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
                let files = WebpackWatchedGlobEntries.getFiles(globString, globOptions, pluginOptions.basename_as_entry_name);

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
     * @param basename_as_entry_name
     * @returns {{}}
     */
    static getFiles(globString, globOptions, basename_as_entry_name) {

        let files = {};
        let globBaseOptions = globBase(globString);

        glob.sync(globString, globOptions).forEach(function (file) {

            // Format the entryName
            let entryName = file.replace(globBaseOptions.base + '/', '');

            entryName = entryName.replace(path.extname(entryName), '');

            if (basename_as_entry_name) {
                entryName = path.basename(entryName);
            }

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
