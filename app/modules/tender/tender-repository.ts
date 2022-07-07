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

const storeTender = (_tender: Tender) => Tender.send(_tender)
const editTender = (_tender: Tender) => Tender.send(_tender, _tender.id)

const fetchById = (tenderId: string) => tender.fetchBy(tenderId)

export {
    fetchAllTenders,
    fetchActiveTenders,
    fetchInactiveTenders,
    storeTender,
    editTender,
    fetchById
}
