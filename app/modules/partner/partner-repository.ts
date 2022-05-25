/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/partner/partner-repository
 */

import Partner      from './partner'
import { Nullable } from "../../../types/nullable";

const partner = new Partner()

const fetchAllPartners = () => partner.all()
const fetchAllActivePartners = (activityId?: Nullable<string>) => partner.findActive(activityId)
const fetchAllInactivePartners = (activityId?: Nullable<string>) => partner.findInactive(activityId)

export {
    fetchAllPartners,
    fetchAllActivePartners,
    fetchAllInactivePartners
}
