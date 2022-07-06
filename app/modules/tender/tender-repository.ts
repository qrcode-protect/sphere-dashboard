/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/tender/tender-repository
 */

import Tender from './tender'

const tender = new Tender()

const fetchAllTenders = () => tender.all()
const fetchActiveTenders = () => tender.findActive()
const fetchInactiveTenders = () => tender.findInactive()

export {
    fetchAllTenders,
    fetchActiveTenders,
    fetchInactiveTenders
}
