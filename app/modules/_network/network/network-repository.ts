/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/network/network-repository
 */

import Network from './network'

const network = new Network()

const fetchAllNetworks = () => network.all()

export {
    fetchAllNetworks,
}
