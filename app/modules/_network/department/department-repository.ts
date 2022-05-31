/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/network/network-repository
 */

import Department from './department'

const network = new Department()

const fetchAllNetworks = () => network.all()

export {
    fetchAllNetworks,
}
