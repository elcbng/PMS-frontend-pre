/// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require('path');

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "[name].js"
  },
  devServer: {
    contentBase: "./dist",
    inline: true
  },
  resolve: {
    extensions: [".js", ".html"],
    alias: {
      '@asserts': path.resolve('./src/asserts') // 使用别名简化相对路径
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.art/,
        use: "art-template-loader"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?esModule=false&context=src/images&name=images/[path][name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: [0.75, 0.90],
              speed: 3,
            },
          },
        }]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template/index.art", // 与之前不同的地方，是在这里引入了 .art 模版
      templateParameters: { // 这个是用来传递模版所需的变量参数
        title: "title info"
      }
    })
  ]
};