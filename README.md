# Webpack watched glob entries plugin
Webpack plugin to glob directories for entry files and also watch them for changes

## Why?
I wanted to use Webpack for my projects but was missing a way to add new entries without touching the config.


## So what does it do?
It globs the provided paths and uses the resulting files as entry points

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

## Install

Install through NPM or Yarn =>

`yarn install webpack-watched-glob-entries-plugin -D`

or

`npm install --save-dev webpack-watched-glob-entries-plugin` 


## Usage

```js

// Get the plugin
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');


 
// In your config definition:
{
    ...
    
    entry: WebpackWatchedGlobEntries.getEntries(
      [
        path.resolve(__dirname, 'entry/**/*.js')
      ],
      {
          // Optional glob options passed to glob.sync
      }
    )
    
    ... // Further in your config
    
    plugins: [
        new WebpackWatchedGlobEntries,
    ],
    
    ...
}

```


## Todo

- Add testing
- Add examples
- Add those pretty little bars on top of the Github readme
