/*
 * (c) Sofiakb <contact.sofiakb@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File config/vue/vue.config
 *
 * @author sofiakb
 */

const configureWebpack = require('./webpack.config')
const { chainWebpack } = require('./webpack.chain')

module.exports = {
  configureWebpack,
  chainWebpack,
  /*pwa: {
    workboxPluginMode: 'GenerateSW',
    workboxOptions   : {
      skipWaiting: true
    }
  },*/

  publicPath: process.env.PUBLIC_PATH || '/',
  assetsDir : 'static',

  productionSourceMap: false,

  devServer: {
    port            : process.env.APP_PORT || 4000,
    // disableHostCheck: true
  },
  transpileDependencies: [
    'vue-meta',
  ],
};
