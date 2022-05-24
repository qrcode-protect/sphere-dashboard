/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/partner/partner-repository
 */

import Partner from './partner'

const partner = new Partner()

const fetchAllPartners = () => partner.all()

export {
    fetchAllPartners,
}
