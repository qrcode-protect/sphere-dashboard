'use strict';

/*
 * exudatain-manager-app
 *
 * (c) Sofiakb <contact.sofiakb@gmail.com>
 *
 * Created by WebStorm on 13/12/2021 at 09:46
 * File vendor/sofiakb/vue3-framework/models/download
 */

import configAttributes   from '@config/api';
import DownloadController from "@sofiakb/vue3-framework/http/controllers/download-controller";

class Download {

	get(url: string, data: any, options: any = {}) {
		const controller = new DownloadController({ ...configAttributes, ...options.controller?.attributes })
		return controller.post(url, data, options)
	}
}

export default Download