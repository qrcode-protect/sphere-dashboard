/*
 * (c) Sofiakb <contact.sofiakb@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File vendor/sofiakb/vue3-framework/http/utils
 *
 * @author sofiakb
 */

import helpers from "@app/vue/utils/helpers";
import moment  from "moment";

const isObject = (val: any) => val instanceof Object;
const isMoment = (val: any) => val instanceof moment;

const parseDate = (data: any) => {
  Object.keys(data).map(key => {
    if (isObject(data[key]))
      parseDate(data[key])

    if (isMoment(data[key]))
      data[key] = data[key].format('YYYY-MM-DD HH:mm:ss')
  })
  return data
};

const __options = (options: any) => {
  if (options.data)
    options.data = parseDate(options.data)
  if (!options.headers)
    options.headers = {};
  if (typeof options.withCredentials === undefined)
    options.withCredentials = true;
  if (process.env.API_KEY)
  options.headers['X-API-KEY'] = process.env.API_KEY;
  if (helpers.loading)
    options.loading = helpers.loading;

  return options;
};

const __createError = (error: any) => {
  let message = error && error.response && error.response.data && error.response.data.data && error.response.data.data.error
    ? error.response.data.data.error : error.message || "Une erreur est survenue, merci de réessayer plus tard.",
    status = error?.response?.status || error?.status || 500;
  return { message, status }
};

export {
  __options,
  __createError
}
