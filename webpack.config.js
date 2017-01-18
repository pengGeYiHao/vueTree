var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/main.js',
        // vendors: ['vue', 'vue-router', 'vue-animated-list', 'vue-resource', 'handlebars']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: './dist/',
        filename: 'build.min.js',
        chunkFilename: '[name]_[hash].min.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            loader: 'css-loader',
                            fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        })
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file',
                options: {
                    name: 'images/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            filename:'./index.html',
            htmlWebpackPlugin: {
                "files": {
                    //"css": ["app.css"],
                    //"js": ["bundle.js", "vendors.js"]
                }
            }
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            options: {
                postcss: function () {
                    return [precss, autoprefixer];
                },
                devServer: {
                    contentBase: "./dist", //本地服务器所加载的页面所在的目录
                    colors: true, //终端中输出结果为彩色
                    historyApiFallback: true, //不跳转
                    inline: true //实时刷新
                }
            }
        })
    ])
}
