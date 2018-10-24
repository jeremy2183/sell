'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')  //開發、運行時共享的文件
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
//導入express
const express = require('express')

//創建express實例
const app = express()

//1.讀取json數據
var goods = require('../data/01-商品页(点菜).json');
var ratings = require('../data/02-商品页(评价).json');
var seller = require('../data/03-商品页(商家).json');

//2.路由
// var routes = express.Router();

//3.編寫接口
// routes.get('/goods',(req,res)=>{
//   //返回數據給客戶端，返回json數據
//   res.json(goods);  
// });

// routes.get('/ratings',(req,res)=>{
//   //返回數據給客戶端，返回json數據
//   res.json(ratings);  
// });

// routes.get('/seller',(req,res)=>{
//   //返回數據給客戶端，返回json數據
//   res.json(seller);  
// });

//4.中間件
// app.use('/api',routes);

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

// baseWebpackConfig和當前配置進行合併
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // 傳入的參數 true
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser, // 是否自動打開瀏覽器
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,

    // 是給webpack-dev-middleware中間使用的
    // express專門為webpack開發的中間件
    // 放置內存中
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },

    //3.編寫接口
    before(app){
      app.get('/api/goods',(req,res)=>{
        //返回數據給客戶端，返回json數據
        res.json(goods);
      }),
      app.get('/api/ratings',(req,res)=>{
        //返回數據給客戶端，返回json數據
        res.json(ratings);
      }),
      app.get('/api/seller',(req,res)=>{
        //返回數據給客戶端，返回json數據
        res.json(seller);
      })
    }
  },
  // 插件
  plugins: [
    // 
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(), // 熱加載插件
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(), // 跳過編譯時出錯的代碼，使編譯的運要包不會出現錯誤
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      //  編譯生成的html文件名
      filename: 'index.html',
      template: 'index.html',

      //表示打包輸出過程中，會自動將.css和.js添加到上述文件中
      //css默認路徑是head標籤中
      // js默認路徑是body裡面
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})




module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
