const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
    // 17540589401

module.exports = {
    target: "web", //目标是浏览器
    entry: {
        commonCss: './src/js/common/commonCss.js',
        dom: './src/js/common/dom.js',
        http: './src/js/common/http.js',
        utils: './src/js/common/utils.js',
        weui: './src/lib/weui/weui.js',
        swiper: './src/lib/swiper/swiper-bundle.js',
        captcha: './src/lib/captcha/captcha-mini.js',
        home: './src/js/home.js',
        login: './src/js/login.js',
        reg: './src/js/reg.js',
        ad: './src/js/ad.js',
        my: './src/js/my.js',
        per: './src/js/per.js',
        run: './src/js/run.js',
        ride: './src/js/ride.js',
        course: './src/js/course.js',
        courseD: './src/js/courseD.js',
        player: './src/js/player.js',
        sportD: './src/js/sportD.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: 'js/[name]-[hash:5].js',
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../'
                }
            }, 'css-loader'],
        }, {
            test: /\.less$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../'
                }
            }, 'css-loader', 'less-loader'],
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            loader: 'url-loader',
            options: {
                name: '[hash].[ext]',
                limit: 10 * 1024,
                outputPath: 'image'
            }
        }, {
            test: /\.html$/,
            use: ['html-loader'],
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader',
            options: {
                name: '[hash:10].[ext]',
                outputPath: 'fonts'
            }
        }, {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/page/home.html',
            filename: 'home.html',
            chunks: ['home', 'commonCss', 'dom', 'utils', 'http', 'swiper', 'weui']
        }), new HtmlWebpackPlugin({
            template: './src/page/reg.html',
            filename: 'reg.html',
            chunks: ['reg', 'commonCss', 'http', 'dom', 'utils', 'captcha', 'weui']
        }), new HtmlWebpackPlugin({
            template: './src/page/login.html',
            filename: 'login.html',
            chunks: ['login', 'commonCss', 'http', 'dom', 'utils', 'weui']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/ad.html',
            filename: 'ad.html',
            chunks: ['ad', 'commonCss', 'http', 'dom', 'utils']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/my.html',
            filename: 'my.html',
            chunks: ['my', 'commonCss', 'http', 'dom', 'utils']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/per.html',
            filename: 'per.html',
            chunks: ['per', 'commonCss', 'http', 'dom', 'utils', 'weui']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/run.html',
            filename: 'run.html',
            chunks: ['run', 'commonCss', 'http', 'dom', 'utils', 'weui']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/ride.html',
            filename: 'ride.html',
            chunks: ['ride', 'commonCss', 'http', 'dom', 'utils', 'weui']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/course.html',
            filename: 'course.html',
            chunks: ['course', 'commonCss', 'http', 'dom', 'utils', 'weui']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/courseD.html',
            filename: 'courseD.html',
            chunks: ['courseD', 'commonCss', 'http', 'dom', 'utils', 'weui']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/player.html',
            filename: 'player.html',
            chunks: ['player', 'commonCss', 'http', 'dom', 'utils']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/sportD.html',
            filename: 'sportD.html',
            chunks: ['sportD', 'commonCss', 'http', 'dom', 'utils', 'weui']
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name]-[hash:5].css",
        }), new OptimizeCssAssetsWebpackPlugin()

    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
        compress: true, // 启动gzip
        port: 666, // 端口
        open: true, // 自动打开服务
        openPage: 'ad.html',
        publicPath: "/"
    },
    watch: true,
    mode: "production",
};