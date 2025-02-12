const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin

// 针对线上生产环境做优化，如压缩
module.exports = merge(common, {
  mode: "production",
  entry: "./src/App.ts",
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          MiniCSSExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: "[name]-[contenthash:8].css",
      chunkFilename: "[id].css"
    }),
    new BundleAnalyzerPlugin({ analyzerPort: "auto" })
  ]
})
