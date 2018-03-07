const path = require('path');

const WebpackWatchedGlobEntries = require('..');

module.exports = {
    entry: WebpackWatchedGlobEntries.getEntries([path.resolve(__dirname, 'src/**/*.js')]),
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new WebpackWatchedGlobEntries
    ]
};
