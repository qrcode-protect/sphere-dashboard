'use strict';

/*
 * exudatain-manager-app
 *
 * (c) Sofiakb <contact.sofiakb@gmail.com>
 *
 * Created by WebStorm on 13/12/2021 at 10:48
 * File vendor/sofiakb/vue3-framework/http/controllers/download-controller
 */

import Controller from "@sofiakb/vue3-framework/http/controllers/controller";
import axios      from "axios";
import cookie     from '@sofiakb/cookie'


export default class DownloadController extends Controller {

	request(path: string, options: any = {}): Promise<unknown> {
		const headers = {
			...{
				'Content-Type' : 'application/json',
				'Authorization': `Bearer ${cookie.get(process.env.TOKEN_NAME || 'sphere-dashboard_token')}`,
				'X-API-KEY'    : process.env.API_KEY || null
			}, ...options.headers || {}
		}

		return new Promise((resolve, reject) =>
			// @ts-ignore
			axios.post(`${this._server || this.server}/${path}`, options.data, {
					responseType: 'arraybuffer',
					headers
				})
				.then((response: any) => resolve(response && response.data && response.data.data ? response.data.data : response))
				.catch((error: any) => reject(error))
		)
	}

	post(url: string, data: any, options: any = {}): Promise<unknown> {
		return this.request(url, { ...options, ...{ data } });
	}

}
