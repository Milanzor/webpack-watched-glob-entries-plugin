const path = require('path');

const WebpackWatchedGlobEntries = require('..');

module.exports = {
    entry: WebpackWatchedGlobEntries.getEntries(
        // Globs
        [
            path.resolve(__dirname, 'src/**/*.js')
        ],

        // Glob options
        {},

        // Plugin options
        {
            basename_as_entry_name: true
        }
    ),
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new WebpackWatchedGlobEntries
    ]
};
