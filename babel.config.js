module.exports = {
  presets: [
    // 配置规则
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage", // 按需加载
        corejs: 3,
        targets: {
          browsers: ['last 1 version','> 1%','not dead']
        }
      }
    ],
    // [
    //   '@babel/preset-typescript', // 引用Typescript插件
    //   {
    //     allExtensions: true, // 支持所有文件扩展名，否则在vue文件中使用ts会报错
    //   },
    // ],
    // 支持vue中的jsx语法
    // "@vue/babel-preset-jsx"
  ],
  // 配置插件
  plugins: [
    // [
    //   "@babel/plugin-transform-runtime",
    //   {
    //     corejs: 3 // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
    //   }
    // ]
  ]
}
