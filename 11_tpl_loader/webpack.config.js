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
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: resolve(__dirname, "src/app.js"),
  output: {
    path: resolve(__dirname, "build"),
    filename: "app.[hash:16].js",
    clean: true,
  },
  devtool: "source-map", // false
  resolveLoader: {
    modules: ["node_modules", resolve(__dirname, "loaders")],
  },
  module: {
    // 规则
    rules: [
      {
        test: /\.tpl$/, // 匹配要使用的文件
        use: [
          // 当一个文件需要多个loader时，从最后的loader开始执行，其传入的参数是文件的原始内容。返回结果传入倒数第二个loader, 作为其入参，依次处理，直到第一个loader。
          "babel-loader",
          {
            loader: "tpl-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "index.html"),
    }),
  ],
  devServer: {
    port: 8011,
  },
};
