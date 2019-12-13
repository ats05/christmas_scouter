const path = require('path');

module.exports = {
    entry: {
        'index': path.resolve(__dirname, 'src/index.jsx'),
    },
    output: {
        path: path.resolve(__dirname, 'assets/'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    devServer: {
        contentBase: path.resolve(__dirname, ''),
        port: 3127,
    },
}
