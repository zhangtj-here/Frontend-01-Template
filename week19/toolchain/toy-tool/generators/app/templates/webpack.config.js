var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/main.js",
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
        // new CopyWebpackPlugin([{
        //     from: "src/index.html",
        //     to: "dist"
        // }], {
        //     ignore: [],
        //     copyUnmodified: true
        // })
    ],
    devServer: {
        // contentBase: path.resolve('./'),
        open: true,
        hot: true, // 开启了热更新
        contentBase: "./src",
        compress: false,
    },
    mode: "development",
    optimization: {
        minimize: false
    }

}