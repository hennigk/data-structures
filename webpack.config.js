var path = require('path');
var webpack = require('webpack');
 module.exports = {
     entry: './Search_Algorithms/app.js',
     output: {
         path: path.resolve(__dirname, 'Search_Algorithms/build'),
         filename: 'app.bundle.js'
     },
     watch: true,
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                     // ignore: ["**/d3.js"]
                 }
                 
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };