module.exports = api => {
  // `api.file` - path to the file
  // `api.mode` - `mode` value of webpack, please read https://webpack.js.org/configuration/mode/
  // `api.webpackLoaderContext` - loader context for complex use cases
  // `api.env` - alias `api.mode` for compatibility with `postcss-cli`
  // `api.options` - the `postcssOptions` options

  if (/\.xxx$/.test(api.file)) {
    return {}
  }

  return {
    // https://github.com/postcss/postcss#plugins
    plugins: [
      // adds vendor prefixes, using data from Can I Use
      require("autoprefixer"),
      // css minifier
      require("cssnano"),
      // convert modern CSS into something most browsers can understand
      require("postcss-preset-env")
    ]
  }
}
