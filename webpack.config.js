var path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: path.join(__dirname, 'src'),
                loader: 'babel-loader' }
        ]
    }
};