const path = require('path')

module.exports = {
    devtool: 'eval-cheap-module-source-map',
    entry: './index.js',
    output: {
        library: ['Garbler'],
        libraryTarget: 'umd',
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|__tests__)/,
            use: {
                loader: 'babel-loader',
                options: {
                    plugins: ['transform-runtime'],
                    presets: [
                        ['env', {
                            loose: true,
                            targets: {
                                browsers: ['last 2 versions', '> 2%', 'ie > 10'],
                                node: ['> 4'],
                            },
                        }]
                    ],
                }
            },
        }]
    }
}
