'use strict';

/*
 * vue3-project-default
 *
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 15:27
 * File app/config/confs/webpack.chain
 */

module.exports = {
  chainWebpack: (config) =>
    config
      .plugin('html')
      .tap(args => {
        args[0].title = process.env.APP_NAME;
        args[0].BASE_URL = process.env.PUBLIC_PATH;
        return args;
      })
}
