const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const WebpackWatchedGlobEntries = require('..');

module.exports = {
    entry: WebpackWatchedGlobEntries.getEntries(
        // Globs
        [
            path.resolve(__dirname, 'src/**/*.js'),
			path.resolve(__dirname, 'src/**/*.scss')
        ],
    ),
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
    plugins: [
        new WebpackWatchedGlobEntries,
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
    ]
};
