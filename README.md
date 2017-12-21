# Webpack watched glob entries plugin
Webpack plugin to glob directories for entry files and also watch them for changes


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
      ]
      {
          // Optional glob options passed to glob.sync
      }
    )
    
    ...
}

```


## Todo

- Add testing
- Add examples
- Add those pretty little bars on top of the Github readme
