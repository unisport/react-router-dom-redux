/**
 * Webpack Config
 */
var path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: {
        index: path.join(__dirname, '/src/index.js')
    },
    output: {
        path: path.join(__dirname, '/dist/js/'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react', 'stage-2']
            }
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    }
};
