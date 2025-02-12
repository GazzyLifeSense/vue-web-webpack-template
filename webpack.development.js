const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
const { resolve } = require("path")

// 针对本地开发环境做优化
module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  entry: resolve(__dirname, "src/App.ts"),
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.(less)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
      }
    ]
  },
  devServer: {
    hot: true,
    port: 8081,
    compress: true,
    static: {
      directory: resolve(__dirname, "dist")
    },
    // 自动打开浏览器
    open: true
  }
})
