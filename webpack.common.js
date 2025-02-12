// webpack.common.js 用于公共配置
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader")
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
const path = require("path")
console.log(process.env.NODE_ENV)

module.exports = {
  output: {
    publicPath: "/",
    filename: "js/chunk-[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "images/[hash][ext][query]" // 指定静态资源导出的文件名
  },
  resolve: {
    //路径别名
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    //引入文件时省略后缀
    extensions: [".js", ".ts", ".vue", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.js$/,
        use: ["babel-loader"]
      },
      {
        test: /\.ts$/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        //匹配文件后缀的规则
        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
        type: "asset",
        parser: {
          //转base64的条件
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb  指定大小
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb  指定大小
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb  指定大小
          }
        }
      }
    ]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: '[contenthash].css'
    // }),
    new VueLoaderPlugin(),
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      title: "app",
      template: "./src/index.html",
      filename: "index.html",
      favicon: './public/favicon.ico'
    })
  ]
}
