module.exports = {
    entry: "./main.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['@babel/plugin-transform-react-jsx', {pragma:"createElement"}]]
                    }
                }
            },
            {
                test: /\.view$/,
                use: {
                    loader: require.resolve('./myloader.js')
                }
            },
            {
                test: /\.css$/,
                use: {
                    loader: require.resolve('./cssloader.js')
                }
            }
        ]
    },
    devServer: {
        // contentBase: path.resolve('./'),
        open: true,
        hot: true, // 开启了热更新
    },
    mode: "development",
    optimization: {
        minimize: false
    }

}