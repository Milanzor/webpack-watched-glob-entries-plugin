[![travis-build][travis-build]][travis-build-url]
[![david-dm-status][david-dm-status]][david-dm-status-url]
[![license][license]][license-url]
[![downloads-week][downloads-week]][downloads-week-url]


# Webpack-watched-glob-entries-plugin
Provides a way to glob for entry files in Webpack `watch` and `non-watch` modes.

## Install

Install through `yarn` or `npm` =>

```sh
yarn add -D webpack-watched-glob-entries-plugin
```

or

```sh
npm install --save-dev webpack-watched-glob-entries-plugin
```

## Usage

```js

// Get the plugin
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');
 
// In your Webpack config:
{
    ... // At your entry definition
    
    entry: WebpackWatchedGlobEntries.getEntries(
      [ 
        // Your path(s) 
        path.resolve(__dirname, 'entry/**/*.js'),
        path.resolve(__dirname, 'more/entries/**/*.js')
      ],
      {
          // Optional glob options that are passed to glob.sync()
          ignore: '**/*.test.js'
      }
    )
    
    ... // At the plugin definition
    
    plugins: [
        new WebpackWatchedGlobEntries(),
    ],
    
    ...
}

```

## Why?
I wanted to use Webpack for my projects but was missing a way to add new entries without touching the config.

## Example
If you have the following source structure:

```
- entries
    - main.js
    - Some
        - stuff.js
    - Other
        - things.js 
```

The entries will look like:
```
{
    "main":         "/abs/path/to/main.js",
    "Some/stuff":   "/abs/path/to/Some/stuff.js",
    "Other/things": "/abs/path/to/Other/things.js"
}
```

Now add `[name]` in your `output.filename` and the entry file directory structure will be reflected in the output directory.



[travis-build]: https://api.travis-ci.com/Milanzor/webpack-watched-glob-entries-plugin.svg?branch=master
[travis-build-url]: https://travis-ci.com/Milanzor/webpack-watched-glob-entries-plugin

[david-dm-status]: https://david-dm.org/milanzor/webpack-watched-glob-entries-plugin.svg
[david-dm-status-url]: https://david-dm.org/milanzor/webpack-watched-glob-entries-plugin

[license]: https://img.shields.io/github/license/Milanzor/webpack-watched-glob-entries-plugin.svg
[license-url]: https://github.com/Milanzor/webpack-watched-glob-entries-plugin/blob/master/LICENSE

[downloads-week]: https://img.shields.io/npm/dw/webpack-watched-glob-entries-plugin.svg
[downloads-week-url]: https://www.npmjs.com/package/webpack-watched-glob-entries-plugin
