var path = require('path');

module.exports = {
  entry: "./lib/ddd.js",
  output: {
  	filename: "./lib/bundle.js"
  },
  devtool: 'source-map',
};
