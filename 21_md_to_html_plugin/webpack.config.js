/**
 * mode development production 开发模式
 * entry 入口文件
 * output path filename  打包输出文件路径
 * devtool source-map 调试开发者工具
 * module rules loader 模块
 * plugins 插件
 * devServer 开发服务器
 */
const { resolve } = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const MdToHtmlPlugin = require('./plugins/md-to-html-plugin')

module.exports = {
  mode: "development",
  entry: resolve(__dirname, "src/app.js"),
  output: {
    path: resolve(__dirname, "build"),
    filename: "app.[hash:16].js",
    clean: true,
  },
  devtool: "source-map", // false
  // resolveLoader: {
  //   modules: ["node_modules"],
  // },
  module: {
    // 规则
    rules: [
      {
        test: /\.js$/, // 匹配要使用的文件
        use: [
          {
            loader: "babel-loader",
            options: {},
          },
        ],
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: resolve(__dirname, "index.html"),
    // }),
    new MdToHtmlPlugin({
      template: resolve(__dirname, "index.md"),
      filename: 'index.html'
    })
  ],
  devServer: {
    port: 8021,
  },
};
