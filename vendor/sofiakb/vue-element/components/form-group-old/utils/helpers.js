/**
 * File app/helpers.js
 *
 * Ce fichier contient les outils utiles
 * au bon fonctionnement de l'app
 *
 * @author sofianeakbly
 **/


// import moment from 'moment'
// import date   from 'moment-timezone'

import {moment, twoDigits} from "."

let helpers = {};

helpers.twoDigits = (n) => twoDigits(n);
helpers.moment = (date = null, format = null) => moment(date, format);
helpers.clone = (object) => JSON.parse(JSON.stringify(object));

export default helpers

