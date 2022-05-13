/*
 * (c) Sofiakb <contact.sofiakb@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File config/vue/webpack.config
 *
 * @author sofiakb
 */

const webpack = require('webpack'),
	path = require('path'),
	fs = require('fs'),
	packageJson = fs.readFileSync('./package.json'),
	version = JSON.parse(packageJson).version || 0;

const resolve = (dir) => path.resolve(__dirname, `../../${dir}`)

module.exports = {
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'APP_NAME'       : JSON.stringify(process.env.APP_NAME),
				'APP_ENV'        : JSON.stringify(process.env.APP_ENV),
				'NODE_ENV'       : JSON.stringify(process.env.APP_ENV),
				'APP_PORT'       : JSON.stringify(process.env.APP_PORT),
				'APP_MAINTENANCE': JSON.stringify(process.env.APP_MAINTENANCE),
				'API_SERVER'     : JSON.stringify(process.env.API_SERVER),
				'API_KEY'        : JSON.stringify(process.env.API_KEY),
				'PUBLIC_PATH'    : JSON.stringify(process.env.PUBLIC_PATH),
				'TOKEN_NAME'     : JSON.stringify(process.env.TOKEN_NAME),
				'ROUTER_MODE'    : JSON.stringify(process.env.ROUTER_MODE),

				'VERSION': JSON.stringify(version)
			}
		})
	],

	optimization: {
		minimize: false,
	},

	resolve: {
		alias: {
			'@'                   : resolve('resources'),
			'@app'                : resolve('app'),
			'@config'             : resolve('config'),
			'@sofiakb/vue-element': resolve('vendor/sofiakb/vue-element'),
			'@sofiakb/vue3-framework': resolve('vendor/sofiakb/vue3-framework'),
		}
	},

	entry: {
		app: './artisan.ts'
	},
};
