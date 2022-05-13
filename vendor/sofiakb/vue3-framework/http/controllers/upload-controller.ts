'use strict';

/*
 * exudatain-manager-app
 *
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 13/12/2021 at 10:48
 * File vendor/sofiakb/vue3-framework/http/controllers/upload-controller
 */

import Controller from "@sofiakb/vue3-framework/http/controllers/controller";
import axios      from "axios";
import cookie     from '@sofiakb/cookie'


export default class UploadController extends Controller {

	request(path: string, options: any = {}): Promise<unknown> {
		const headers = {
			...{
				'Content-Type' : 'multipart/form-data',
				'Authorization': `Bearer ${cookie.get(process.env.TOKEN_NAME || 'sphere-dashboard_token')}`,
				'X-API-KEY'    : process.env.API_KEY || null
			}, ...options.headers || {}
		}
		return new Promise((resolve, reject) =>
			// @ts-ignore
			axios.post(`${this._server || this.server}/${path}`, options.data, {
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
